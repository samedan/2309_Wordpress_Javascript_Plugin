import {
  TextControl,
  Flex,
  FlexBlock,
  FlexItem,
  Button,
  Icon,
  PanelBody,
  PanelRow,
  ColorPicker,
  RadioControl,
} from "@wordpress/components";
import { useState } from "@wordpress/element";
import "./index.scss";
import {
  InspectorControls,
  BlockControls,
  AlignmentToolbar,
  useBlockProps,
} from "@wordpress/block-editor";
import { ChromePicker } from "react-color";

////////////////////////////
// Function that is always on
(function () {
  let locked = false; // the button 'Update' on the wordpress page

  wp.data.subscribe(function () {
    // the 'results' array will be empty if no correct answer is marked
    const results = wp.data
      .select("core/block-editor")
      .getBlocks()
      .filter(function (block) {
        return (
          block.name == "ourplugin/are-you-paying-attention" &&
          block.attributes.correctAnswer == undefined
        );
      });
    // If there ARE NOT correct answers voted
    if (results.length && locked == false) {
      locked = true;
      // lock the 'Update' button (in wordpress)
      wp.data.dispatch("core/editor").lockPostSaving("noanswer");
    }
    // If there ARE correct answers voted
    if (!results.length && locked) {
      locked = false;
      // Unlock the 'Update' button (in wordpress)
      wp.data.dispatch("core/editor").unlockPostSaving("noanswer");
    }
  });
})();
/////////////////////////////////
// End Function that is always on

wp.blocks.registerBlockType("ourplugin/are-you-paying-attention", {
  title: "Are You Paying Attention?",
  icon: "smiley",
  category: "common",
  attributes: {
    question: { type: "string" },
    answers: { type: "array", default: [""] },
    correctAnswer: { type: "number", default: 0 },
    bgColor: { type: "string", default: "#ebebeb" },
    theAlignment: { type: "string", default: "left" },
  },
  description: "Give your audience a chance to prove their comprehension.",
  example: {
    attributes: {
      question: "What is my name?",
      answers: ["Meawsalot", "Barksalot", "Purrsalot", "Dan"],
      correctAnswer: 3,
      bgColor: "#CFE8F1",
      theAlignment: "center",
    },
  },
  edit: EditComponent,
  save: function (props) {
    return null;
  },
});
// correctAnswer: { type: "number", default: undefined },

function EditComponent(props) {
  const [option, setOption] = useState("a");

  const blockProps = useBlockProps({
    className: "paying-attention-edit-block",
    style: { backgroundColor: props.attributes.bgColor },
  });
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
    // if correct answer is deleted (undefined as default)
    if (indexToDelete == props.attributes.correctAnswer) {
      props.setAttributes({ correctAnswer: undefined });
    }
  }

  function markAsCorrect(index) {
    props.setAttributes({ correctAnswer: index });
  }

  if (props.attributes.answers) {
    console.log(props.attributes.answers);
  } else {
    return <p>Loading...</p>;
  }

  return (
    <div {...blockProps}>
      <BlockControls>
        <AlignmentToolbar
          value={props.attributes.theAlignment}
          onChange={(x) => props.setAttributes({ theAlignment: x })}
        />
      </BlockControls>
      <InspectorControls>
        <PanelBody title="Background Panel" initialOpen={true}>
          <PanelRow>
            <ChromePicker
              color={props.attributes.bgColor}
              onChangeComplete={(x) => props.setAttributes({ bgColor: x.hex })}
              disableAlpha={true}
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>
      <TextControl
        label="Question:"
        value={props.attributes.question}
        onChange={updateQuestion}
        style={{ fontSize: "20px" }}
      />
      {/* ANSWERS */}
      <p style={{ fontSize: "13px", margin: "20px 0 8px 0" }}>Answers:</p>

      {props.attributes.answers.map(function (answer, index) {
        if (answer != null) {
          if (answer != null && index == 1) {
            console.log(`answer.conseils`, answer.conseils);
          }
          // console.log(`answer${index}`, answer);
        }
        // if (answer[2] != null) {
        //   console.log(`answerConseils`);
        // }

        return (
          <Flex>
            <FlexBlock>
              <RadioControl
                label="Type de Question"
                // help="The type of the current user"
                selected={null}
                options={[
                  { label: "Oui", value: "Oui" },
                  { label: "Non", value: "Non" },
                ]}
                // onChange={(value) => {
                //   setOption(value);
                //   const newAnswers = props.attributes.answers.concat([]);
                //   newAnswers[index] = value;
                //   props.setAttributes({ answers: newAnswers });
                // }}
                // onChange={(newValue) => {
                //   const newAnswers = props.attributes.answers.concat([]);
                //   newAnswers[index] = newValue;
                //   props.setAttributes({ answers: newAnswers });
                // }}
                // onChange={(newValue) => {
                //   console.log(newValue);
                //   const newAnswers = props.attributes.answers.concat([]);

                //   newAnswers[index] = setOption(newValue);
                //   console.log(newAnswers[index]);
                //   props.setAttributes({ answers: newAnswers });
                // }}
              />
            </FlexBlock>
            <FlexBlock>
              <TextControl
                autoFocus={answer == undefined}
                label="Meds"
                value={answer}
                onChange={(newValue) => {
                  const newAnswers = props.attributes.answers.concat([]);
                  newAnswers[index] = newValue;
                  props.setAttributes({ answers: newAnswers });
                }}
              />
            </FlexBlock>
            {/* {answer[1] && (
              <FlexBlock>
                <p>answer.conseils: {answer[1]}</p>
                <TextControl
                  autoFocus={answer == undefined}
                  label="Conseils"
                  value={answer.conseils}
                  onChange={(newValue) => {
                    const newAnswers = props.attributes.answers.concat([]);
                    newAnswers[index] = newValue;
                    props.setAttributes({ answers: newAnswers });
                  }}
                />
              </FlexBlock>
            )} */}

            {/* Icon Correct Answer */}
            <FlexItem>
              <Button onClick={() => markAsCorrect(index)}>
                <Icon
                  icon={
                    props.attributes.correctAnswer == index
                      ? "star-filled"
                      : "star-empty"
                  }
                  className="mark-as-correct"
                />
              </Button>
            </FlexItem>
            {/* END Icon Correct Answer */}

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
      {props.attributes.answers.map(function (answer, index) {
        if (answer != null && index == 1)
          return (
            <div style={{ backgroundColor: "#EEEEEE" }}>
              <Flex>
                <p>CONSEILS</p>

                <FlexBlock>
                  {/* <p>answer.conseils: {answer.conseils}</p> */}
                  <TextControl
                    autoFocus={answer == undefined}
                    label="Conseils"
                    value={answer.conseils}
                    onChange={(newValue) => {
                      const newConseils = { conseils: newValue };
                      const newAnswers = props.attributes.answers.concat([]);

                      newAnswers[index] = newConseils;
                      props.setAttributes({ answers: newAnswers });
                    }}
                  />
                </FlexBlock>
              </Flex>
            </div>
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
      <Button
        isPrimary
        onClick={() => {
          props.setAttributes({
            answers: props.attributes.answers.concat([
              { conseils: "Conseil 1" },
            ]),
          });
        }}
      >
        Add Conseils
      </Button>
    </div>
  );
}
