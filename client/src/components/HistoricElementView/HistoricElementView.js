import React from 'react';

const ElementalAreaHistoryFactory = (FieldGroup) =>
  class HistoricElementView extends FieldGroup {
    render() {
      const legend = this.getLegend();
      const Tag = this.props.data.tag || 'div';
      const className = this.getClassName();
      const { data } = this.props;

      return (
        <Tag className={className}>
          {legend}
          <div className={'elemental-preview'}>
            <div className={'elemental-preview__icon'}><i className={data.ElementIcon} /></div>
            <div className={'elemental-preview__detail'}>
              <h3>{data.ElementTitle} <small>{data.ElementType}</small></h3>
              <a className={'HistoricElementView-fullHistory'} href={data.ElementEditLink}>
                Block history
              </a>
            </div>
          </div>
          {this.props.children}
        </Tag>
      );
    }
  };

export default ElementalAreaHistoryFactory;
