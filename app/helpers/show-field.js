import Ember from 'ember';
import toTimecode from 'public/utils/timecode';

export default Ember.Helper.extend({
  store: Ember.inject.service(),
  lookupCustom(show, fieldDisplay) {
    let value = show.get('customFields').find((field) => {
      return Ember.get(field, 'showField') === fieldDisplay.get('showField');
    });

    if (value) {
      switch(value.type) {
        case 'file':
          let file =  this.get('store').peekRecord('web-file', value.value);
          return Ember.get(file || {}, 'url');
        case 'producer':
          let producer = this.get('store').findRecord('producer', value.value);
          return Ember.get(producer || {}, 'name');
        default:
          return value.value;
      }
    }
  },
  compute([show, fieldDisplay]) {
    switch(fieldDisplay.get('field')) {
      case 'localId':
        return show.get('localId');
      case 'showId':
        return show.get('id');
      case 'project':
        return show.get('project.name');
      case 'title':
        return show.get('title');
      case 'cgTitle':
        return show.get('cgTitle');
      case 'eventDate':
        return show.get('eventDate');
      case 'totalRunTime':
        return toTimecode(show.get('totalRunTime'));
      case 'category':
        return show.get('category.name');
      case 'producer':
        return show.get('producer.name');
      case 'comments':
        return show.get('comments');
      case 'runCount':
        return show.get('runCount');
      case 'firstRun':
        return show.get('absoluteFirstRun.runDateTime');
      case 'custom':
        return this.lookupCustom(show, fieldDisplay);
      default:
        return `Unhandled Field ${fieldDisplay.get('field')}`;
    }
  }
});