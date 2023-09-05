import {
  TextControl,
  Flex,
  FlexBlock,
  FlexItem,
  Button,
  Icon,
} from "@wordpress/components";
import "./index.scss";

wp.blocks.registerBlockType("ourplugin/are-you-paying-attention", {
  title: "Are You Paying Attention?",
  icon: "smiley",
  category: "common",
  attributes: {
    question: { type: "string" },
    answers: { type: "array", default: ["red", "blue", "green"] },
  },
  edit: EditComponent,
  save: function (props) {
    return null;
  },
});

function EditComponent(props) {
  function updateQuestion(value) {
    props.setAttributes({ question: value });
  }

  function deleteAnswer(indexToDelete) {
    const newAnswers = props.attributes.answers.filter(function (x, index) {
      // 'filter' runs for every item of the array
      // if result of condition is 'true', the item will be included in teh new array
      return index != indexToDelete;
    });
    props.setAttributes({ answers: newAnswers });
  }

  return (
    <div className="paying-attention-edit-block">
      <TextControl
        label="Question:"
        value={props.attributes.question}
        onChange={updateQuestion}
        style={{ fontSize: "20px" }}
      />
      <p style={{ fontSize: "13px", margin: "20px 0 8px 0" }}>Answers:</p>
      {props.attributes.answers.map(function (answer, index) {
        return (
          <Flex>
            <FlexBlock>
              <TextControl
                autoFocus={answer == undefined}
                value={answer}
                onChange={(newValue) => {
                  const newAnswers = props.attributes.answers.concat([]);
                  newAnswers[index] = newValue;
                  props.setAttributes({ answers: newAnswers });
                }}
              />
            </FlexBlock>
            <FlexItem>
              <Button>
                <Icon icon="star-empty" className="mark-as-correct" />
              </Button>
            </FlexItem>
            <FlexItem>
              <Button
                isLink
                className="attention-delete"
                onClick={() => deleteAnswer(index)}
              >
                Delete
              </Button>
            </FlexItem>
          </Flex>
        );
      })}

      <Button
        isPrimary
        onClick={() => {
          props.setAttributes({
            answers: props.attributes.answers.concat([undefined]),
          });
        }}
      >
        Add another answer
      </Button>
    </div>
  );
}
