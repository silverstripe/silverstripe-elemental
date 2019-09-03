/* eslint-disable import/no-extraneous-dependencies */
/* global jest, describe, it, expect */
import prefixClassNames from '../prefixClassNames';

describe('prefixClassNames', () => {
  const classNames = prefixClassNames('my-prefix__');

  it('simple string', () => {
    const css = classNames('my-component');
    expect(css).toBe('my-prefix__my-component');
  });

  it('blank string', () => {
    const css = classNames('');
    expect(css).toBe('my-prefix__');
  });

  it('object', () => {
    const css = classNames({ 'my-component': true, 'my-component--hover': false });
    expect(css).toBe('my-prefix__my-component');
  });

  it('array', () => {
    const css = classNames(['my-component']);
    expect(css).toBe('my-prefix__my-component');
  });

  it('null', () => {
    const css = classNames(null);
    expect(css).toBe('');
  });

  it('false', () => {
    const css = classNames(false);
    expect(css).toBe('');
  });

  it('0', () => {
    const css = classNames(0);
    expect(css).toBe('');
  });

  it('numeric', () => {
    const css = classNames(123456789);
    expect(css).toBe('my-prefix__123456789');
  });

  it('combination', () => {
    const css = classNames('my-component', ['my-array'], { 'my-object': true });
    expect(css).toBe('my-prefix__my-component my-prefix__my-array my-prefix__my-object');
  });
});
