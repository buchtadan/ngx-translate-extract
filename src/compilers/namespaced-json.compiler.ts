import { CompilerInterface } from './compiler.interface';
import { TranslationCollection } from '../utils/translation.collection';
import { stripBOM } from '../utils/utils';

import { flatten, unflatten } from 'flat';

export class NamespacedJsonCompiler implements CompilerInterface {
	public indentation: string = '\t';
	public eofNewline = false;

	public extension = 'json';

	public constructor(options?: any) {
		if (options && typeof options.indentation !== 'undefined') {
			this.indentation = options.indentation;
		}
		if (options && typeof options.eofNewline !== 'undefined') {
			this.eofNewline = options.eofNewline;
		}
	}

	public compile(collection: TranslationCollection): string {
		const values: {} = unflatten(collection.values, {
			object: true
		});

		let json = JSON.stringify(values, null, this.indentation);
		return json + (this.eofNewline ? '\n' : '');
	}

	public parse(contents: string): TranslationCollection {
		const values: {} = flatten(JSON.parse(stripBOM(contents)));
		return new TranslationCollection(values);
	}
}
