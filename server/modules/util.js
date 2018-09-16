export const updateArr = (items, item, action) => {
  if (action === 'add') {
    if (items.includes(item)) {
      return items;
    }
    return [item].concat(items);
  } else if (action === 'remove') {
    return items.filter(i => i !== item);
  }
  // else if action === 'standby'
  return items;
};

/*
NOTE: newKey is the userId. field is 'contribute', 'watch' etc.
The structure of the dict is as such:

dict: {
  <userId>: {
    <field>: <Date or null>
  }
}
*/
export const addToDict = (dict, key, field) => {
  let entry;

  if (dict[key]) {
    // If there's already a field called key in dict,
    // create entry for that field based on the existing entry
    // for that field by copying.
    entry = Object.assign({}, dict[key]);
  } else {
    // If there's not already a field called key in dict,
    // create a new entry for that field
    entry = {};
  }

  entry[field] = new Date();
  const newDict = Object.assign({}, dict);
  newDict[key] = entry;

  return newDict;
};
export const deleteFromDict = (dict, key, field) => {
  // Edge case: you can't delete key and associated entry
  // from dict if the key doesn't exist in dict
  if (!dict[key]) return dict;

  // Copy over the existing entry
  const entry = Object.assign({}, dict[key]);
  entry[field] = null;

  const newDict = Object.assign({}, dict);
  newDict[key] = entry;
  return newDict;
};
export const urlSlug = (title, fingerprint) => {
  // This function creates a slugified version of the title
  const slugify = (string) => {
    const a = 'àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;';
    const b = 'aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------';
    const p = new RegExp(a.split('').join('|'), 'g');
    return string.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters in a with b
      .replace(/&/g, '-and-') // Replace & with ‘and’
      .replace(/[^\w-]+/g, '') // Remove all non-word characters such as spaces or tabs
      .replace(/--+/g, '-') // Replace multiple — with single -
      .replace(/^-+/, '') // Trim — from start of text
      .replace(/-+$/, ''); // Trim — from end of text
  };
  return `${slugify(title)}-${fingerprint}`;
};
