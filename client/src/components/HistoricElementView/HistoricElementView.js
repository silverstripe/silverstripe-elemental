import React from 'react';
import i18n from 'i18n';
import classnames from 'classnames';

const ElementalAreaHistoryFactory = (FieldGroup) =>
  class HistoricElementView extends FieldGroup {
    getClassName() {
      const classlist = [super.getClassName()];
      if (this.props.data.ElementID) {
        classlist.unshift('elemental-area__element--historic-inner');
      }
      return classnames(classlist);
    }

    render() {
      const legend = this.getLegend();
      const Tag = this.props.data.tag || 'div';
      const classNames = this.getClassName();
      const { data } = this.props;

      if (!data.ElementID) {
        return super.render();
      }

      return (
        <Tag className={classNames}>
          {legend}
          <div className={'elemental-preview elemental-preview--historic'}>
            {data.ElementEditLink &&
              <a className={'elemental-preview__link'} href={data.ElementEditLink}>
                {i18n._t('HistoricElementView.BLOCK_HISTORY', 'View block')}
                <i className={'font-icon-angle-right'} />
              </a>
            }
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
