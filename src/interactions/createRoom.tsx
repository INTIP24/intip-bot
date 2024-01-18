import { ButtonStyle } from "discord.js";
import { InteractionHandler } from "@/lib/interaction";
import { Button, Row, Message, createElement, Embed, Modal } from "@/lib/jsx";
import { useButton } from "@/lib/hooks";

function createRoom(): InteractionHandler {
  const openModal = useButton(async (interaction, env, ctx) {
    ctx.wait();

    return <Modal></Modal>;
  });

  return async function* (interaction, env, ctx) {
    ctx.wait();

    return (
      <Message>
        <Embed></Embed>
        <Row>
          <Button action={openModal} style={ButtonStyle.Success}>
            Luo Ryhmä
          </Button>
        </Row>
      </Message>
    );
  };
}
