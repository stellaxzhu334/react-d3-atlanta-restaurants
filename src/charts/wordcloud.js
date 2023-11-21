import React, { Component } from 'react';
import { Group } from '@visx/group';
import { Wordcloud } from '@visx/wordcloud';
import { Text } from '@visx/text';
import { scalePow } from 'd3-scale';


// Function to process text and calculate word frequencies
const getWordFrequencies = (text) => {
  const words = text.split(/\s+/);
  const frequencies = {};
  words.forEach((word) => {
    if (!frequencies[word]) {
      frequencies[word] = 0;
    }
    frequencies[word] += 1;
  });
  return Object.keys(frequencies).map(word => ({ text: word, value: frequencies[word] }));
};

const wordColor = scalePow()
  .exponent(2)
  .domain([0, 0.5])
  .range(["#fbc02d", "#e65100"]);

class WordCloudComponent extends Component {
  render() {
    const { restaurant } = this.props;

    console.log(restaurant);
    // console.log(restaurant.text_processed);

    if (!restaurant || !restaurant.text_processed) {
      return null; // No restaurant selected or no text
    }

    const words = getWordFrequencies(restaurant.text_processed);
    const width = 800;
    const height = 300;

    // console.log(words);

    // Function to set the font size for each word
    const fontSize = (word) => Math.sqrt(word.value) * 10;
    return (
      <svg width={width} height={height}>
        {/* <Group x={width / 2} y={height / 2}> */}
        <Wordcloud
          words={words}
          width={width}
          height={height}
          font="Impact"
          fontSize={fontSize}
          spiral="archimedean"
          rotate={() => 0}
          fill={(word) => wordColor(word.value / words.length)}
        >
          {cloudWords => cloudWords.map((cloudWord, i) => (
            <Text
              key={`wordcloud-word-${i}`}
              fill={wordColor(cloudWord.value / words.length)}
              textAnchor="middle"
              transform={`translate(${cloudWord.x}, ${cloudWord.y}) rotate(${cloudWord.rotate})`}
              fontSize={cloudWord.size}
              style={{ fontFamily: 'Impact' }}
            >
              {cloudWord.text}
            </Text>
          ))}
        </Wordcloud>
        {/* </Group> */}
      </svg>
    );
  }
}

export default WordCloudComponent;