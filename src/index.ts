import { range, randomInt, randomColorGenerator } from './utils';

/**
 * Props constructor
 *
 * @interface IProps
 */
interface IProps {
  width: number;
  height: number;
  stroke: number;
  maxShapes: number;
  opacity: number;
}

/**
 * Svg image generator
 *
 * @class SvgImageGenerator
 */
export default class SvgImageGenerator {
  /**
   * props
   *
   * @type {IProps}
   * @memberof SvgImageGenerator
   */
  public props: IProps;

  /**
   * Creates an instance of SvgImageGenerator.
   * @param {IProps} props
   * @memberof SvgImageGenerator
   */
  constructor(props: IProps) {
    this.props = Object.assign({
      width: 500,
      height: 300,
      stroke: 2,
      maxShapes: 16,
      opacity: 1.0,
    }, props || {});
  }

  /**
   * Shape generator
   *
   * @returns {string}
   * @memberof SvgImageGenerator
   */
  public shapeGenerator(): string {
    const int: number = randomInt(5);
    let el: string = '';

    switch (int) {
      case 0:
        el += `<rect x="${randomInt(this.props.width)}" y="${randomInt(this.props.height)}" width="${randomInt(this.props.width / 2)}" height="${randomInt(this.props.width / 2)}"`;
        break;
      case 1:
        el += `<circle cx="${randomInt(this.props.width)}" cy="${randomInt(this.props.height)}" r="${randomInt(Math.min(this.props.width, this.props.height) / 4)}"`;
        break;
      case 2:
        el += `<ellipse cx="${randomInt(this.props.width)}" cy="${randomInt(this.props.height)}" rx="${randomInt(this.props.width / 2)}" ry="${randomInt(this.props.width / 2)}"`;
        break;
      default:
        el += `<polyline points="${range(1, randomInt(6) + 3).map(() => randomInt(this.props.width) + ' ' + randomInt(this.props.width)).join(', ')}"`;
        break;
    }

    if (randomInt(2) === 0 && int !== 3) {
      el += ` fill="${randomColorGenerator()}" fill-opacity="${this.props.opacity}"/>`;
    } else {
      el += ` fill="none" fill-opacity="${this.props.opacity}" stroke="${randomColorGenerator()}" stroke-opacity="${this.props.opacity}"/>`;
    }

    return el;
  }

  /**
   * Creat image
   *
   * @returns {object}
   * @memberof SvgImageGenerator
   */
  public creatImage(): object {
    const svg: string = `<?xml version="1.0"?>
    <svg xmlns="http://www.w3.org/2000/svg" width="${this.props.width}" height="${this.props.height}">
    <rect height="${this.props.height}" width="${this.props.width}" fill="${randomColorGenerator()}"/>${range(0, this.props.maxShapes).map(() => this.shapeGenerator()).join('')}
    </svg>`;
    return {
      svg,
      base64: `data:image/svg+xml;base64,${window.btoa(svg)}`,
    };
  }
}
