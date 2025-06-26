import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'csv-parser';
import { Movie } from '../interfaces/movie.dto';


export async function loadMoviesFromCsv(): Promise<Movie[]> {
    const results: Movie[] = []
    const filePath = path.resolve(__dirname, '../../../../data/movielist.csv')

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv({ separator: ';' }))
            .on('data', (data) => {
                results.push({
                    year: parseInt(data.year),
                    title: data.title,
                    studios: data.studios,
                    producers: data.producers,
                    winner: data.winner?.trim().toLowerCase() === 'yes',
                });
            })
            .on('end', () => resolve(results))
            .on('error', reject);
    })
}