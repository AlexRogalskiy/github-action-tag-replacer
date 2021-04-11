import * as core from '@actions/core'

import replaceInFile, { ReplaceInFileConfig, ReplaceResult } from 'replace-in-file'

import { ConfigOptions } from '../typings/domain-types'

import { getProperty, getRequiredProperty } from './utils/properties'
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

const processSourceFile = async (options: Required<ConfigOptions>): Promise<boolean> => {
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

const buildConfigOptions = (options: Partial<ConfigOptions>): Required<ConfigOptions> => {
    const prefix = options.prefix || getProperty('prefix') || ''
    const suffix = options.suffix || getProperty('suffix') || ''

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

const executeOperation = async (...options: Partial<ConfigOptions>[]): Promise<boolean> => {
    const promises: Promise<boolean>[] = []

    for (const option of options) {
        const options = buildConfigOptions(option)
        promises.push(processSourceFile(options))
    }

    const result = await Promise.all(promises)

    return result.every(value => value)
}

const runReplacingOperation = async (): Promise<void> => {
    const sourceData = getProperty('sourceData')

    let status = false
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
    } catch (error) {
        core.setFailed(`Cannot process input file data, message: ${error.message}`)
    }
}

run()
