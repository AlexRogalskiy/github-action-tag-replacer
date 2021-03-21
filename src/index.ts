import * as core from '@actions/core'
import { basename } from 'path'
import replaceInFile, { ReplaceInFileConfig, ReplaceResult } from 'replace-in-file'

import { ConfigOptions } from '../typings/types'

import { getDataAsJson } from './utils/files'
import { isBlankString } from './utils/validators'
import { serialize } from './utils/serializers'
import { mergeProps } from './utils/commons'
import { profile } from './utils/env'

const replaceContent = async (options: ReplaceInFileConfig): Promise<ReplaceResult[]> => {
    const results = await replaceInFile.replaceInFile(options)

    core.info(`Replacement results: ${serialize(results)}`)

    return results
}

const processSourceFile = async (options: Required<ConfigOptions>): Promise<boolean> => {
    core.info(
        `
        Processing source file: ${options.sourceFile} with:
        prefix=${options.prefix},
        suffix=${options.suffix},
        placeholder=${options.placeholder}
        `
    )

    const fileOptions: ReplaceInFileConfig = mergeProps(profile, {
        files: options.sourceFile,
        from: new RegExp(options.placeholder),
        to: `${options.prefix}${options.replacement}${options.suffix}`,
    })

    const result = await replaceContent(fileOptions)

    return result.every(v => v.hasChanged)
}

const getConfigOptions = (options: any = {}): Required<ConfigOptions> => {
    const prefix = options.prefix || core.getInput('prefix')
    const suffix = options.suffix || core.getInput('suffix')

    const sourceFile = options.sourceFile || core.getInput('sourceFile', { required: true })
    const placeholder = options.placeholder || core.getInput('placeholder', { required: true })
    const replacement = options.replacement || core.getInput('replacement') || basename(sourceFile)

    return {
        prefix,
        suffix,
        sourceFile,
        placeholder,
        replacement,
    }
}

const processData = async (...options: ConfigOptions[]): Promise<void> => {
    let status = false

    for (const item of options) {
        const options = getConfigOptions(item)
        status = await processSourceFile(options)
    }

    core.setOutput('changed', status)
}

export default async function run(): Promise<void> {
    try {
        const sourceData = core.getInput('sourceData')

        if (!isBlankString(sourceData)) {
            const options = getDataAsJson(sourceData)
            await processData(...options)
        } else {
            await processData({})
        }
    } catch (e) {
        core.setFailed(`Cannot process input file, message: ${e.message}`)
    }
}

run()
