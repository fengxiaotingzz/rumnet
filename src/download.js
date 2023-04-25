const downloadFunc = require('download-git-repo');
const ora = require('ora')

module.exports = ({url, dir, type}) => {
    const oraLoading = ora(`Downloading ${type} template.`)
    oraLoading.start();
    downloadFunc(`github:${url}`, dir, (err)=>{
        if (!err) {
            oraLoading.text = `Successfully created ${umi} project!`
            oraLoading.succeed()
        }
    })
}