const DEFAULT_DESCRIPTION = 'Nerif, the most advanced CS:GO predicting algorithm.';

export function setMetaData(
  { 
    description = '', 
    title = '',
  }) {
    document.getElementsByTagName('meta')["description"].content = description || DEFAULT_DESCRIPTION;
    document.getElementsByTagName('title')[0].innerText = title ? `Nerif | ${ title }` : 'Nerif';
}