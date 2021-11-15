/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
import {compose, equals, prop, values, filter, gt, allPass, map, curry, all} from "ramda";

const isGreen = equals('green');
const isRed = equals('red');
const isBlue = equals('blue');
const isOrange = equals('orange');
const isWhite = equals('white');

const getLength = prop('length');
const getStar = prop('star');
const getSquare = prop('square');
const getTriangle = prop('triangle');
const getCircle = prop('circle');

const isRedFigure = (figure) => equals('red', figure)
const isGreenFigure = (figure) => equals('green', figure)
const isWhiteFigure = (figure) => equals('white', figure)
const isBlueFigure = (figure) => equals('blue', figure)
const isOrangeFigure = (figure) => equals('orange', figure)
const isCountThanOne = (number) => gt(number, 1);

const isCountEq = (number1, number2) => equals(number1, number2)
const add = curry(isCountEq)

const isRedStar = compose(
    isRedFigure,
    getStar
)

const isGreenSquare = compose(
    isGreenFigure,
    getSquare
)

const isWhiteTriangle = compose(
    isWhiteFigure,
    getTriangle
)
const isWhiteCircle = compose(
    isWhiteFigure,
    getCircle
)

const filterColorData = (color) => filter(equals(color))

const countColorFigure = (color) => compose(getLength, filterColorData(color), values);


/*const chechBlueAndRed1 = compose(
    isCountEq(countColorFigure('blue'), countColorFigure('red'))
)

const chechBlue = compose(
    isCountEq,
    countColorFigure('blue')
)
const chechRed = compose(
    isCountEq,
    countColorFigure('red')
)*/
const allMatches = all(figure => figure);
const areBlueAndRedEqual = () => equals(countColorFigure('blue'), countColorFigure('red'));

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([
    isRedStar,
    isGreenSquare,
    isWhiteTriangle,
    isWhiteCircle
]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(isCountThanOne, countColorFigure('green'));

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = compose(
    add(countColorFigure('blue')),
    add(countColorFigure('red'))
)


// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = allPass([
    isBlueFigure('circle'),
    isRedFigure('star'),
    isOrangeFigure('square')
])

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = ({star, square, triangle, circle}) => {

};

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = () => false;

// 7. Все фигуры оранжевые.
export const validateFieldN7 = compose(
    allMatches,
    map(isOrange),
    values
)

// 8. Не красная и не белая звезда.
export const validateFieldN8 = () => {
    return !isRedFigure('star') && !isWhiteFigure('star')
};

// 9. Все фигуры зеленые.
export const validateFieldN9 = compose(
    allMatches,
    map(isGreen),
    values
)

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = () => false;
