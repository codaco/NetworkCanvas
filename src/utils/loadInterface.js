import React from 'react';
import {
  NameGeneratorInterface,
  QuizInterface,
  SociogramInterface,
  OrdinalBinInterface,
} from '../containers/Interfaces';

export default function loadInterface(options) {
  if (Object.hasOwnProperty.call(options, 'custom')) { return options.custom; }
  switch (options) {
    case 'NameGenerator':
      return NameGeneratorInterface;
    case 'Sociogram':
      return SociogramInterface;
    case 'Quiz':
      return QuizInterface;
    case 'OrdinalBin':
      return OrdinalBinInterface;
    default:
      return () => (<div>No &quot;{options}&quot; interface found.</div>);
  }
}
