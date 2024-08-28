import React from 'react';
import backend from 'lib/Backend';
import { getConfig } from 'state/editor/elementConfig';
import Config from 'lib/Config';

const revertToBlockVersionRequest = (HistoryViewerVersionDetailComponent) => (props) => {
  const newProps = { ...props };
  if (!newProps.hasOwnProperty('actions')) {
    newProps.actions = {};
  }
  newProps.actions.revertToVersion = (id, fromVersion, fromStage, toStage) => {
    const url = `${getConfig().controllerLink.replace(/\/$/, '')}/api/revert`;
    return backend.post(url, {
      id,
      fromVersion,
      fromStage,
      toStage
    }, {
      'X-SecurityID': Config.get('SecurityID')
    });
  };
  return <HistoryViewerVersionDetailComponent {...newProps}/>;
};

export default revertToBlockVersionRequest;
