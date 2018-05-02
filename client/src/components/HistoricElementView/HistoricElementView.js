import React from 'react';

const ElementalAreaHistoryFactory = (FieldGroup) =>
  class HistoricElementView extends FieldGroup {
    render() {
      const legend = this.getLegend();
      const Tag = this.props.data.tag || 'div';
      const className = this.getClassName();
      const { data } = this.props;

      return (
        <Tag className={`${className} elementalarea__element--historic-inner`}>
          {legend}
          <div className={'elemental-preview elemental-preview--historic'}>
            <a className={'elemental-preview__link'} href={data.ElementEditLink}>
              View block
              <i className={'font-icon-angle-right'} />
            </a>
            <div className={'elemental-preview__icon'}><i className={data.ElementIcon} /></div>
            <div className={'elemental-preview__detail'}>
              <h3>{data.ElementTitle} <small>{data.ElementType}</small></h3>
            </div>
          </div>
          {this.props.children}
        </Tag>
      );
    }
  };

export default ElementalAreaHistoryFactory;
