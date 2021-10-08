import type { UserConfig } from '@commitlint/types'

const Configuration: UserConfig = {
    parserPreset: 'conventional-changelog-conventionalcommits',
    rules: {
        'body-leading-blank': [
            1,
            'always'
        ],
        'body-max-line-length': [
            2,
            'always',
            100
        ],
        'footer-leading-blank': [
            1,
            'always'
        ],
        'footer-max-line-length': [
            2,
            'always',
            100
        ],
        'header-max-length': [
            2,
            'always',
            100
        ],
        'scope-case': [
            2,
            'always',
            'lower-case'
        ],
        'subject-case': [
            2,
            'never',
            [
                'sentence-case',
                'start-case',
                'pascal-case',
                'upper-case'
            ]
        ],
        'subject-empty': [
            2,
            'never'
        ],
        'subject-full-stop': [
            2,
            'never',
            '.'
        ],
        'type-case': [
            2,
            'always',
            'lower-case'
        ],
        'type-empty': [
            2,
            'never'
        ],
        'type-enum': [
            2,
            'always',
            [
                'major',
                'MAJOR',
                'minor',
                'MINOR',
                'breaking-change',
                'BREAKING-CHANGE',
                'patch',
                'build',
                'chore',
                'ci',
                'docs',
                'feat',
                'FEAT',
                'fix',
                'perf',
                'refactor',
                'REFACTOR',
                'revert',
                'style',
                'test'
            ]
        ]
    }
}

module.exports = Configuration