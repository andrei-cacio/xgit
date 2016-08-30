module.exports = {
  unstagedFiles: [
    ['repos', 'statusFiles'],
    (files) => {
      return files.size ? files
        .filter(file => !/INDEX/.test(file.get('status')))
        .map(file => `[${file.get('status').replace(/INDEX_/, '')[0]}] ${file.get('path')}`) : '';
    }
  ],
  stagedFiles: [
    ['repos', 'statusFiles'],
    (files) => {
      return files.size ? files
        .filter(file => /INDEX/.test(file.get('status')) || !/INDEX_NEW/.test(file.get('status')))
        .map(file => `[${file.get('status').replace(/INDEX_/, '')}] ${file.get('path')}`) : '';
    }
  ]
}
