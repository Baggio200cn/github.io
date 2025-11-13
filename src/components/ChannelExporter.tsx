// Placeholder component for channel export functionality
import './ChannelExporter.css'

function ChannelExporter() {
  return (
    <div className="channel-exporter">
      <h3>平台导出</h3>
      <p>未来功能：导出到公众号、头条、X、小红书、bilibili</p>
      <div className="export-buttons">
        <button disabled>微信公众号</button>
        <button disabled>今日头条</button>
        <button disabled>X (Twitter)</button>
        <button disabled>小红书</button>
        <button disabled>Bilibili</button>
      </div>
    </div>
  )
}

export default ChannelExporter
