import { formatString } from '../src/formatDataName/formatDataName';

describe('Names with correct format', () => {
    test('return without white spaces', () => {
        const nameExamples = {
            firstExample: 'Santa Cruz de Tenerife',
            secondExample: 'Castillo del Romeral',
            thirdExample: 'Santa Cruz de La Palma',
            fourthExample: 'Castilla La Mancha',
            fifthExample: 'La Banda',
            sixthExample: 'Las Palmas de Gran Canaria',
            seventhExample: 'Gran Canaria',
            eighthExample: 'Tenerife',
            ninthExample: 'Pasadilla-Roque',
        };
        expect(formatString('santa cruz de tenerife')).toEqual(nameExamples.firstExample);
        expect(formatString('castillo del romeral')).toEqual(nameExamples.secondExample);
        expect(formatString('santa cruz de la palma')).toEqual(nameExamples.thirdExample);
        expect(formatString('castilla la mancha')).toEqual(nameExamples.fourthExample);
        expect(formatString('banda (la)')).toEqual(nameExamples.fifthExample);
        expect(formatString('palmas de gran canaria (las)')).toEqual(
            nameExamples.sixthExample,
        );
        expect(formatString('gran canaria')).toEqual(nameExamples.seventhExample);
        expect(formatString('tenerife')).toEqual(nameExamples.eighthExample);
        expect(formatString('pasadilla-roque')).toEqual(nameExamples.ninthExample);
    });
});
