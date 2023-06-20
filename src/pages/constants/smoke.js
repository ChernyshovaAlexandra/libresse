
import bg from '../../assets/images/product_sequence_BG.jpg'
import clouds from '../../assets/images/smoke.png'
/* smoke.js */

let THREE = window.THREE

export class Smoke {

  constructor(options) {
    const defaults = {
      width: document.getElementsByClassName('app')[0].getBoundingClientRect().width,
      height: document.getElementsByClassName('app')[0].getBoundingClientRect().height
    };

    Object.assign(this, options, defaults);
    this.onResize = this.onResize.bind(this);

    this.addEventListeners();
    this.init();
  }

  init() {
    const { width, height } = this;

    this.clock = new THREE.Clock();

    const renderer = this.renderer = new THREE.WebGLRenderer();

    renderer.setSize(width, height);

    this.scene = new THREE.Scene();

    const meshGeometry = new THREE.CubeGeometry(200, 200, 200);
    const meshMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      wireframe: false
    });
    this.mesh = new THREE.Mesh(meshGeometry, meshMaterial);

    this.cubeSineDriver = 0;

    this.addCamera();
    this.addLights();
    this.addParticles();
    this.addBackground();

    document.querySelector('.app').appendChild(renderer.domElement);
  }

  evolveSmoke(delta) {
    const { smokeParticles } = this;

    let smokeParticlesLength = smokeParticles.length;

    while (smokeParticlesLength--) {
      smokeParticles[smokeParticlesLength].rotation.z += delta * 0.2;
    }
  }

  addLights() {
    const { scene } = this;
    const light = new THREE.DirectionalLight(0xffffff, 0.99999);

    light.position.set(-1, 0, 1);
    scene.add(light);
  }

  addCamera() {
    const { scene } = this;
    const camera = this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 1, 10000);

    camera.position.z = 1000;
    scene.add(camera);
  }

  addParticles() {
    const { scene } = this;
    const textureLoader = new THREE.TextureLoader();
    const smokeParticles = this.smokeParticles = [];

    textureLoader.load(clouds, texture => {
      const smokeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        map: texture,
        transparent: true
      });
      smokeMaterial.map.minFilter = THREE.LinearFilter;
      const smokeGeometry = new THREE.PlaneBufferGeometry(300, 300);

      const smokeMeshes = [];
      let limit = 150;

      while (limit--) {
        smokeMeshes[limit] = new THREE.Mesh(smokeGeometry, smokeMaterial);
        smokeMeshes[limit].position.set(Math.random() * 500 - 250, Math.random() * 500 - 250, Math.random() * 1000 - 100);
        smokeMeshes[limit].rotation.z = Math.random() * 360;
        smokeParticles.push(smokeMeshes[limit]);
        scene.add(smokeMeshes[limit]);
      }
    });
  }

  addBackground() {
    const { scene } = this;
    const textureLoader = new THREE.TextureLoader();
    const textGeometry = new THREE.PlaneBufferGeometry(400, 400);

    textureLoader.load(bg, texture => {
      const textMaterial = new THREE.MeshLambertMaterial({
        blending: THREE.NormalBlending, //AdditiveBlending
        color: 0xffffff,
        map: texture,
        opacity: 1,
        transparent: true
      });
      textMaterial.map.minFilter = THREE.LinearFilter;
      const text = new THREE.Mesh(textGeometry, textMaterial);

      text.position.z = 800;
      scene.add(text);
    });
  }

  render() {
    const { mesh } = this;
    let { cubeSineDriver } = this;

    cubeSineDriver += 0.01;

    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;
    mesh.position.z = 100 + Math.sin(cubeSineDriver) * 500;

    this.renderer.render(this.scene, this.camera);
  }

  update() {
    this.evolveSmoke(this.clock.getDelta());
    this.render();

    requestAnimationFrame(this.update.bind(this));
  }

  onResize() {
    const { camera } = this;

    const windowWidth = document.getElementsByClassName('app')[0].getBoundingClientRect().width;
    const windowHeight = document.getElementsByClassName('app')[0].getBoundingClientRect().height;

    camera.aspect = windowWidth / windowHeight;
    camera.updateProjectionMatrix();

    this.renderer.setSize(windowWidth, windowHeight);
  }

  addEventListeners() {
    window.addEventListener('resize', this.onResize);
  }

}

/* app.js */
