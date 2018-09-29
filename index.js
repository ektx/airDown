#! /usr/bin/env node

const inquirer = require('inquirer')
const execa = require('execa')

inquirer.prompt([
    {
        type: 'input',
        name: 'url',
        message: '请输入视频地址',
        validate: text => {
            if (!text) return '地址不能为空'
            return true
        }
    },
    {
        type: 'input',
        name: 'name',
        message: '请输入保存名称',
        validate: text => {
            if (!text) return '名称不能为空哟'
            return true
        }
    }
]).then(async answers => {
    try {
        let child = execa(
            `./ffmpeg`, 
            ['-i', answers.url, `-codec`, `copy`, answers.name],
            {
                stdio: ['inherit']
            }
        )
        
        child.stdout.on('data', buffer => {
            console.log( buffer.toString().trim())
        })

        child.stderr.on('data', function(data) {
            console.log('err', data.toString());
        });
        
        child.on('close', function() {
            console.log('finished');
        });

        
        console.log('OK')

    } catch (err) {
        console.log(err)
    }
})