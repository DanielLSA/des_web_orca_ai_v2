type MessageBubbleProps = {
  text: string;
  sender: "user" | "ai";
};

export default function MessageBubble({ text, sender }: MessageBubbleProps) {
  const isUser = sender === "user";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: "8px",
      }}
    >
      <div
        style={{
          maxWidth: "70%",
          padding: "10px 14px",
          borderRadius: "12px",
          backgroundColor: isUser ? "#2563eb" : "#1f2937",
          color: "#fff",
        }}
      >
        {text}
      </div>
    </div>
  );
}