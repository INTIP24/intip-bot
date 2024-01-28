import { ButtonStyle } from "discord.js";
import { slashCommand } from "../lib/commands";
import { Button, Row, Message, createElement, Embed } from "../lib/jsx";

export default slashCommand(function createGroup() {
  return async (interaction) => {
    await interaction.deferReply();

    return (
      <Message>
        <Embed>Painamalla alla olevaa nappia voit luoda ryhmän.</Embed>
        <Row>
          <Button style={ButtonStyle.Success}>Luo Ryhmä</Button>
        </Row>
      </Message>
    );
  };
});
