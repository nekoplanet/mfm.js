import { MfmInline, MfmStrike, STRIKE } from '../../../node';
import { Parser } from '../../services/parser';
import { CharCode } from '../../services/character';
import { inlineParser } from '../services/mfmParser';
import { syntax } from '../services/syntaxParser';
import { pushNode } from '../services/nodeTree';

export const strikeTagParser: Parser<MfmStrike> = syntax('strikeTag', (ctx) => {
	let matched;

	// "<s>"
	if (!ctx.str('<s>').ok) {
		return ctx.fail();
	}

	// children
	const children: MfmInline[] = [];
	while (true) {
		if (ctx.matchStr('</s>')) break;
		// LF
		if (ctx.matchRegex(/^(\r\n|[\r\n])/)) break;

		matched = ctx.parser(inlineParser);
		if (!matched.ok) break;
		pushNode(matched.result, children);
	}
	if (children.length === 0) {
		return ctx.fail();
	}

	// "</s>"
	if (!ctx.str('</s>').ok) {
		return ctx.fail();
	}

	return ctx.ok(STRIKE(children));
});

export const strikeTildeParser: Parser<MfmStrike> = syntax('strikeTilde', (ctx) => {
	let matched;

	// "~~"
	if (!ctx.str('~~').ok) {
		return ctx.fail();
	}

	// children
	const children: MfmInline[] = [];
	while (true) {
		if (ctx.matchChar(CharCode.tilde)) break;
		// LF
		if (ctx.matchRegex(/^(\r\n|[\r\n])/)) break;

		matched = ctx.parser(inlineParser);
		if (!matched.ok) break;
		pushNode(matched.result, children);
	}
	if (children.length === 0) {
		return ctx.fail();
	}

	// "~~"
	if (!ctx.str('~~').ok) {
		return ctx.fail();
	}

	return ctx.ok(STRIKE(children));
});
