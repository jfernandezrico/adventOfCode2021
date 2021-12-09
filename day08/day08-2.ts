import path from "path";
import { readSevenSegmentDisplays } from "./read-file";
import {
  SevenSegmentDisplay,
  SevenSegmentPosition,
  SevenSegmentRightPositions,
  sumReducer,
} from "./seven-segment-display";

const sevenSegmentDisplays = readSevenSegmentDisplays(
  path.join(__dirname, "input.txt")
);

const difference = <T>(array1: Array<T>, array2: Array<T>) =>
  array1.filter((x) => !array2.includes(x));

const calculatePositions = (input: string[]): SevenSegmentRightPositions => {
  const rightPositions: SevenSegmentRightPositions = new Map();
  const possiblePositions: SevenSegmentRightPositions = new Map();
  const digitsByLength: Map<number, Array<string>> = new Map();

  input.forEach((digit) => {
    const array = digitsByLength.get(digit.length) ?? [];
    array.push(digit);
    digitsByLength.set(digit.length, array);
  });

  // 1: length 2
  const one = digitsByLength.get(2)![0];

  possiblePositions.set(
    "b" as SevenSegmentPosition,
    one.charAt(0) as SevenSegmentPosition
  );
  possiblePositions.set(
    "c" as SevenSegmentPosition,
    one.charAt(1) as SevenSegmentPosition
  );

  // 7: length 3
  const seven = digitsByLength.get(3)![0];
  const possiblePositionsFor1 = [
    possiblePositions.get("b")!,
    possiblePositions.get("c")!,
  ];
  const sevenPositions = [...seven].map((x) => x as SevenSegmentPosition);
  const [possibleA] = difference(sevenPositions, possiblePositionsFor1);
  possiblePositions.set("a" as SevenSegmentPosition, possibleA);
  rightPositions.set("a" as SevenSegmentPosition, possibleA);

  // 4: length 4
  const four = digitsByLength.get(4)![0];

  const fourPositions = [...four].map((x) => x as SevenSegmentPosition);
  const [possibleF, possibleG] = difference(
    fourPositions,
    possiblePositionsFor1
  );
  possiblePositions.set("f" as SevenSegmentPosition, possibleF);
  possiblePositions.set("g" as SevenSegmentPosition, possibleG);

  // 0, 6, 9: length 6
  const possiblePositionsFor471 = [
    possiblePositions.get("a")!,
    possiblePositions.get("b")!,
    possiblePositions.get("c")!,
    possiblePositions.get("f")!,
    possiblePositions.get("g")!,
  ];

  // find 9
  for (var i = 0; i < digitsByLength.get(6)!.length; i++) {
    const positions = [...digitsByLength.get(6)![i]].map(
      (x) => x as SevenSegmentPosition
    );
    const diff = difference(positions, possiblePositionsFor471);
    // it's a 9: extra position between 4,7,1 is only d
    if (diff.length === 1) {
      possiblePositions.set("d" as SevenSegmentPosition, diff[0]);
      rightPositions.set("d" as SevenSegmentPosition, diff[0]);

      const [missingLetter] = difference(
        ["a", "b", "c", "d", "e", "f", "g"],
        positions
      );
      possiblePositions.set(
        "e" as SevenSegmentPosition,
        missingLetter as SevenSegmentPosition
      );
      rightPositions.set(
        "e" as SevenSegmentPosition,
        missingLetter as SevenSegmentPosition
      );

      digitsByLength.get(6)!.splice(i, 1);
      break;
    }
  }

  // find 0
  const possiblePositionsForFG = [
    possiblePositions.get("f")!,
    possiblePositions.get("g")!,
  ];
  for (var i = 0; i < digitsByLength.get(6)!.length; i++) {
    const positions = [...digitsByLength.get(6)![i]].map(
      (x) => x as SevenSegmentPosition
    );
    const [missingLetter] = difference(
      ["a", "b", "c", "d", "e", "f", "g"],
      positions
    );
    // it's a 0
    const diffWithFG = difference(possiblePositionsForFG, positions);
    if (diffWithFG.length === 1) {
      //switch f, g
      possiblePositions.set(
        "f" as SevenSegmentPosition,
        possiblePositions.get("g")! === diffWithFG[0]
          ? possiblePositions.get("f")!
          : possiblePositions.get("g")!
      );
      rightPositions.set(
        "f" as SevenSegmentPosition,
        possiblePositions.get("g")! === diffWithFG[0]
          ? possiblePositions.get("f")!
          : possiblePositions.get("g")!
      );

      possiblePositions.set("g" as SevenSegmentPosition, diffWithFG[0]);
      rightPositions.set("g" as SevenSegmentPosition, diffWithFG[0]);

      digitsByLength.get(6)!.splice(i, 1);
      break;
    }
  }

  //find 6
  const sixPositions = [...digitsByLength.get(6)![0]].map(
    (x) => x as SevenSegmentPosition
  );

  // it's a 6: extra positions between 4,7,1 are e and d
  const [missingLetterFor6] = difference(
    ["a", "b", "c", "d", "e", "f", "g"],
    sixPositions
  );
  const letterB = missingLetterFor6 as SevenSegmentPosition;
  const letterC =
    possiblePositions.get("c")! === letterB
      ? possiblePositions.get("b")!
      : possiblePositions.get("c")!;

  possiblePositions.set("c" as SevenSegmentPosition, letterC);
  rightPositions.set("c" as SevenSegmentPosition, letterC);

  possiblePositions.set("b" as SevenSegmentPosition, letterB);
  rightPositions.set("b" as SevenSegmentPosition, letterB);

  return rightPositions;
};

const isAZero = (
  digit: string,
  rightPositions: SevenSegmentRightPositions
): boolean =>
  digit.length === 6 &&
  difference(
    [...digit].map((x) => x as SevenSegmentPosition),
    [
      rightPositions.get("a")!,
      rightPositions.get("b")!,
      rightPositions.get("c")!,
      rightPositions.get("d")!,
      rightPositions.get("e")!,
      rightPositions.get("f")!,
    ]
  ).length === 0;

const isAOne = (digit: string): boolean => digit.length === 2;

const isASeven = (digit: string): boolean => digit.length === 3;

const isAFour = (digit: string): boolean => digit.length === 4;

const isAEight = (digit: string): boolean => digit.length === 7;

const isATwo = (
  digit: string,
  rightPositions: SevenSegmentRightPositions
): boolean =>
  digit.length === 5 &&
  difference(
    [...digit].map((x) => x as SevenSegmentPosition),
    [
      rightPositions.get("a")!,
      rightPositions.get("b")!,
      rightPositions.get("g")!,
      rightPositions.get("e")!,
      rightPositions.get("d")!,
    ]
  ).length === 0;

const isAFive = (
  digit: string,
  rightPositions: SevenSegmentRightPositions
): boolean =>
  digit.length === 5 &&
  difference(
    [...digit].map((x) => x as SevenSegmentPosition),
    [
      rightPositions.get("a")!,
      rightPositions.get("f")!,
      rightPositions.get("g")!,
      rightPositions.get("c")!,
      rightPositions.get("d")!,
    ]
  ).length === 0;

const isAThree = (
  digit: string,
  rightPositions: SevenSegmentRightPositions
): boolean =>
  digit.length === 5 &&
  difference(
    [...digit].map((x) => x as SevenSegmentPosition),
    [
      rightPositions.get("a")!,
      rightPositions.get("b")!,
      rightPositions.get("g")!,
      rightPositions.get("c")!,
      rightPositions.get("d")!,
    ]
  ).length === 0;

const isASix = (
  digit: string,
  rightPositions: SevenSegmentRightPositions
): boolean =>
  digit.length === 6 &&
  difference(
    [...digit].map((x) => x as SevenSegmentPosition),
    [
      rightPositions.get("a")!,
      rightPositions.get("f")!,
      rightPositions.get("g")!,
      rightPositions.get("e")!,
      rightPositions.get("c")!,
      rightPositions.get("d")!,
    ]
  ).length === 0;

const calculateDigit = (
  digit: string,
  rightPositions: SevenSegmentRightPositions
): string => {
  if (isAZero(digit, rightPositions)) return "0";
  else if (isAOne(digit)) return "1";
  else if (isATwo(digit, rightPositions)) return "2";
  else if (isAThree(digit, rightPositions)) return "3";
  else if (isAFour(digit)) return "4";
  else if (isAFive(digit, rightPositions)) return "5";
  else if (isASix(digit, rightPositions)) return "6";
  else if (isASeven(digit)) return "7";
  else if (isAEight(digit)) return "8";
  else return "9";
};

const calculateNumber = (
  output: string[],
  rightPositions: SevenSegmentRightPositions
): number =>
  +output.map((digit) => calculateDigit(digit, rightPositions)).join("");

const countDigits = (
  sevenSegmentDisplays: Array<SevenSegmentDisplay>
): number =>
  sevenSegmentDisplays
    .map((sevenSegmentDisplay) => {
      const rightPositions = calculatePositions(sevenSegmentDisplay.input);
      return calculateNumber(sevenSegmentDisplay.output, rightPositions);
    })
    .reduce(sumReducer);

console.log(countDigits(sevenSegmentDisplays));
