const downloadFunc = require('download-git-repo');
const ora = require('ora')
const shell = require('shelljs')

module.exports = ({url, dir, type}) => {
    const oraLoading = ora(`Downloading ${type} template.`)
    oraLoading.start();
    downloadFunc(`github:${url}`, dir, (err)=>{
        if (!err) {
            oraLoading.text = `Successfully created ${type} project!`
            oraLoading.succeed();

            shell.exec(`cd ${dir};git init;`)
            const installLoading = ora(`Installing ${type} template.\n`)
            installLoading.start();
            
            if(shell.exec('npm i').code === 0) {
                oraLoading.text = `Successfully installed ${type} project!`
                installLoading.succeed();
            } else {
                installLoading.stop();
            }
        } else {
            oraLoading.stop()
        }
    })
}