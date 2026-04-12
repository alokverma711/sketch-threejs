const THREE = require('three');

export default class TitleObject {
  constructor() {
    this.uniforms = {
      time: {
        type: 'f',
        value: 0
      },
      resolution: {
        type: 'v2',
        value: new THREE.Vector2()
      },
      texture: {
        type: 't',
        value: null
      }
    };
    this.obj;
    this.isLoaded = false;
  }
  loadTexture(callback) {
    const loader = new THREE.TextureLoader();
    const complete = () => {
      if (!this.obj) {
        this.obj = this.createObj();
      }
      this.isLoaded = true;
      callback();
    };
    loader.load('/sketch-threejs/img/index/tex_title.png', (texture) => {
      texture.magFilter = THREE.NearestFilter;
      texture.minFilter = THREE.NearestFilter;
      this.uniforms.texture.value = texture;
      complete();
    }, undefined, () => {
      complete();
    });
  }
  createObj() {
    return new THREE.Mesh(
      new THREE.PlaneGeometry(256, 64, 40, 10),
      new THREE.RawShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: require('./glsl/titleObject.vs').default,
        fragmentShader: require('./glsl/titleObject.fs').default,
        transparent: true,
      })
    )
  }
  render(time) {
    if (!this.isLoaded) return;
    this.uniforms.time.value += time;
  }
}
