async function ChatDetail({ params }: { params: Promise<{ chatid: string }> }) {
  const { chatid } = await params;

  return <div>{chatid}</div>;
}

export default ChatDetail;
