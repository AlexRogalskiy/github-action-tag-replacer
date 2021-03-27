import * as core from '@actions/core'

import replaceInFile, { ReplaceInFileConfig, ReplaceResult } from 'replace-in-file'

import { ConfigOptions } from '../typings/domain-types'

import { getConfigOptions } from './utils/files'
import { isValidFile } from './utils/validators'
import { serialize } from './utils/serializers'
import { mergeProps } from './utils/commons'

import { profile } from './utils/profiles'
import { coreInfo } from './utils/loggers'

const replaceContent = async (options: ReplaceInFileConfig): Promise<ReplaceResult[]> => {
    const result = await replaceInFile.replaceInFile(options)

    coreInfo(`Replacement results: ${serialize(result)}`)

    return result
}

const processSourceFile = async (options: ConfigOptions): Promise<boolean> => {
    coreInfo(`Processing input source file with options: ${serialize(options)}`)

    const { prefix, suffix, sourceFile, placeholder, replacement } = options

    const fileOptions: ReplaceInFileConfig = mergeProps(profile.replaceOptions, {
        files: sourceFile,
        from: new RegExp(placeholder),
        to: `${prefix}${replacement}${suffix}`,
    })

    const result = await replaceContent(fileOptions)

    return result.every(value => value.hasChanged)
}

const buildConfigOptions = (options: Partial<ConfigOptions>): ConfigOptions => {
    const prefix = options.prefix || getProperty('prefix')
    const suffix = options.suffix || getProperty('suffix')

    const sourceFile = options.sourceFile || getRequiredProperty('sourceFile')
    const placeholder = options.placeholder || getRequiredProperty('placeholder')
    const replacement = options.replacement || getRequiredProperty('replacement')

    return {
        prefix,
        suffix,
        sourceFile,
        placeholder,
        replacement,
    }
}

const getRequiredProperty = (property: string): string => {
    return getProperty(property, { required: true })
}

const getProperty = (property: string, options?: core.InputOptions): string => {
    return core.getInput(property, options)
}

const executeOperation = async (...options: Partial<ConfigOptions>[]): Promise<boolean> => {
    const result: boolean[] = []

    for (const option of options) {
        const options = buildConfigOptions(option)
        const status = await processSourceFile(options)
        result.push(status)
    }

    return result.every(value => value)
}

const runReplacingOperation = async (): Promise<void> => {
    const sourceData = getProperty('sourceData')

    let status: boolean
    if (isValidFile(sourceData)) {
        const options = getConfigOptions(sourceData)
        status = await executeOperation(...options)
    } else {
        status = await executeOperation({})
    }

    core.setOutput('changed', status)
}

export default async function run(): Promise<void> {
    try {
        await runReplacingOperation()
    } catch (e) {
        core.setFailed(`Cannot process input file data, message: ${e.message}`)
    }
}

void run()
