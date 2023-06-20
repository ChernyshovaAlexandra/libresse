import { Component } from 'react'

// Hooks are pure functions returning an object
// describing what kind of effect should be executed

export function useState(initialState) {
  return {
    type: 'STATE',
    initialState,
  }
}

export function useEffect(effect, deps) {
  return {
    type: 'EFFECT',
    effect,
    deps,
  }
}

const overIndex = (index, mapper, arr) => [
  ...arr.slice(0, index),
  mapper(arr[index]),
  ...arr.slice(index + 1),
]

export function hook(gen) {
  return class Hooked extends Component {
    state = { states: [] }

    effects = []

    componentDidMount() {
      this.effectSubscriptions = this.effects.map(({ effect, deps }) => ({
        unsubscribe: effect(),
        deps,
      }))
    }

    componentDidUpdate() {
      this.effects.forEach(({ effect, deps }, effectIndex) => {
        if (
          !deps ||
          (deps.length &&
            deps.every(
              (dep, depIndex) =>
                dep === this.effectSubscriptions[effectIndex].deps[depIndex],
            ))
        ) {
          if (this.effectSubscriptions[effectIndex].unsubscribe) {
            this.effectSubscriptions[effectIndex].unsubscribe()
          }

          this.effectSubscriptions[effectIndex] = {
            unsubscribe: effect(),
            deps,
          }
        }
      })
    }

    componentWillUnmount() {
      this.effects.forEach((_, effectIndex) => {
        if (this.effectSubscriptions[effectIndex].unsubscribe) {
          this.effectSubscriptions[effectIndex].unsubscribe()
        }
      })
    }

    getStateAtIndex = (index, defaultValue) => {
      const state = this.state.states[index]
      return state === undefined ? defaultValue : state
    }

    setStateAtIndex = (index, defaultValue) => valueOrMapper => {
      this.setState(state => ({
        states: overIndex(
          index,
          (value = defaultValue) =>
            typeof valueOrMapper === 'function'
              ? valueOrMapper(value)
              : valueOrMapper,
          state.states,
        ),
      }))
    }

    render() {
      const iterator = gen(this.props)
      let command = { value: undefined, done: false }
      let nextValue
      let index = 0

      while (!command.done) {
        command = iterator.next(nextValue)

        if (!command.done) {
          switch (command.value.type) {
            case 'STATE':
              nextValue = [
                this.getStateAtIndex(index, command.value.initialState),
                this.setStateAtIndex(index, command.value.initialState),
              ]
              break

            case 'EFFECT':
              nextValue = undefined
              this.effects[index] = {
                effect: command.value.effect,
                deps: command.value.deps,
              }
              break

            default:
              throw new Error('Unknown type')
          }

          index++
        }
      }

      return command.value
    }
  }
}
