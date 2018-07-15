const urlSlug = (title, fingerprint) => {
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

module.exports = urlSlug;
