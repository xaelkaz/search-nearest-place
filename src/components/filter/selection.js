/**
 * We need to know if the specified default selection is in one of the options
 * so we can expand that particular menu on render.
 * @param { String } s Default selection text
 * @param { [Object] } xs List of menu options
 * @returns { Boolean }
 */
export default (s, xs) =>
  xs.map((x) => x.text).filter((x) => x === s).length > 0
