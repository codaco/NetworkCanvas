import React from 'react';
import { NameGenerator, Quiz } from '../containers/Interfaces';

export default function loadInterface(options) {
  if (Object.hasOwnProperty.call(options, 'custom')) { return options.custom; }
  switch (options) {
    case 'NameGenerator':
      return NameGenerator;
    case 'Quiz':
      return Quiz;
    default:
      return () => (<div>No &quot;{options}&quot; interface found.</div>);
  }
}
