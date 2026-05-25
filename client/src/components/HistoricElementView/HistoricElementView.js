import React from 'react';
import i18n from 'i18n';
import classnames from 'classnames';
import { getLegend } from 'components/CompositeField/CompositeField';
import { getClassName as getFieldGroupClassName } from 'components/FieldGroup/FieldGroup';

const getClassName = (props = {}) => {
  const classlist = [getFieldGroupClassName(props)];
  if (props.data && props.data.ElementID) {
    classlist.unshift('elemental-area__element--historic-inner');
  }
  return classnames(classlist);
};

const isClassComponent = (ComponentType) => Boolean(
  ComponentType
  && ComponentType.prototype
  && ComponentType.prototype.isReactComponent
);

const ElementalAreaHistoryFactory = (FieldGroup) => {
  if (isClassComponent(FieldGroup)) {
    return class HistoricElementView extends FieldGroup {
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
            <div className="elemental-preview elemental-preview--historic">
              {data.ElementEditLink &&
                <a className="elemental-preview__link" href={data.ElementEditLink}>
                  <span className="elemental-preview__link-text">{i18n._t('HistoricElementView.VIEW_BLOCK_HISTORY', 'Block history')}</span>
                  <span className="font-icon-angle-right btn--icon-lg elemental-preview__link-caret" aria-hidden="true" />
                </a>
              }
              <div className="elemental-preview__icon"><span className={data.ElementIcon} aria-hidden="true" /></div>
              <div className="elemental-preview__detail">
                <h3>{data.ElementTitle} <small>{data.ElementType}</small></h3>
              </div>
            </div>
            {this.props.children}
          </Tag>
        );
      }
    };
  }

  const HistoricElementView = (props) => {
    const { children, data } = props;

    if (!data.ElementID) {
      return <FieldGroup {...props} />;
    }

    const Tag = data.tag || 'div';

    return (
      <Tag className={getClassName(props)}>
        {getLegend(data)}
        <div className="elemental-preview elemental-preview--historic">
          {data.ElementEditLink &&
            <a className="elemental-preview__link" href={data.ElementEditLink}>
              <span className="elemental-preview__link-text">{i18n._t('HistoricElementView.VIEW_BLOCK_HISTORY', 'Block history')}</span>
              <span className="font-icon-angle-right btn--icon-lg elemental-preview__link-caret" aria-hidden="true" />
            </a>
          }
          <div className="elemental-preview__icon"><span className={data.ElementIcon} aria-hidden="true" /></div>
          <div className="elemental-preview__detail">
            <h3>{data.ElementTitle} <small>{data.ElementType}</small></h3>
          </div>
        </div>
        {children}
      </Tag>
    );
  };

  return HistoricElementView;
};

export default ElementalAreaHistoryFactory;
