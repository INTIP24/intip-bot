import { ButtonStyle } from "discord.js";
import { slashCommand } from "../lib/commands";
import { Button, Row, Message, createElement, Embed, Field } from "../lib/jsx";
import { useBoolean, useDescription, useName, useString } from "lib/hooks";

export default slashCommand(function createGroup() {
  useName("creategroup");
  useDescription("Create a group");
  const test = useBoolean("test", "?", { required: true })!;
  const another = useString("another", "some test stuff", {
    choices: [
      { name: "A", value: "aaaa" },
      { name: "B", value: "bbb" },
    ],
  });

  return async (interaction) => {
    await interaction.deferReply();

    return (
      <Message ephemeral>
        <Embed title="Ryhmän luonti">
          Painamalla alla olevaa nappia voit luoda ryhmän.
          <Field name="A" value={test ? "Tosi" : "Epätosi"} />
          <Field name="B" value={another ?? "not_given"} />
        </Embed>
        <Row>
          <Button url="https://discord.nrth.xyz" style={ButtonStyle.Success}>
            Luo Ryhmä
          </Button>
        </Row>
      </Message>
    );
  };
});
