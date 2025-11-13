import { useSettings, ThemePreset, FontFamily, FontSize, CodeTheme } from '../../state/useSettings';
import { useUI } from '../../state/useUI';
import './StylePanel.css';

const THEME_PRESETS: { value: ThemePreset; label: string }[] = [
  { value: 'classic', label: '经典' },
  { value: 'elegant', label: '优雅' },
  { value: 'simple', label: '简约' },
];

const FONT_FAMILIES: { value: FontFamily; label: string }[] = [
  { value: 'sans', label: '无衬线' },
  { value: 'serif', label: '衬线' },
  { value: 'mono', label: '等宽' },
];

const FONT_SIZES: { value: FontSize; label: string }[] = [
  { value: 'sm', label: '小' },
  { value: 'md', label: '中 (推荐)' },
  { value: 'lg', label: '大' },
  { value: 'xl', label: '特大' },
];

const THEME_COLORS = [
  { value: '#0F4C81', label: '经典蓝' },
  { value: '#2c3e50', label: '深灰蓝' },
  { value: '#27ae60', label: '翠绿' },
  { value: '#e74c3c', label: '热情红' },
  { value: '#9b59b6', label: '高贵紫' },
  { value: '#f39c12', label: '活力橙' },
];

const CODE_THEMES: { value: CodeTheme; label: string }[] = [
  { value: 'github-light', label: 'GitHub Light' },
  { value: 'github-dark', label: 'GitHub Dark' },
  { value: 'one-dark', label: 'One Dark' },
  { value: 'solarized-light', label: 'Solarized Light' },
];

export default function StylePanel() {
  const settings = useSettings();
  const { isStylePanelVisible, toggleStylePanel } = useUI();

  if (!isStylePanelVisible) {
    return (
      <button
        className="style-panel-toggle collapsed"
        onClick={toggleStylePanel}
        title="显示样式面板"
      >
        ◀
      </button>
    );
  }

  return (
    <div className="style-panel">
      <div className="style-panel-header">
        <h3>样式设置</h3>
        <button
          className="style-panel-close"
          onClick={toggleStylePanel}
          title="隐藏样式面板"
        >
          ▶
        </button>
      </div>

      <div className="style-panel-content">
        {/* Theme Preset */}
        <div className="style-section">
          <label className="style-label">主题预设</label>
          <div className="style-button-group">
            {THEME_PRESETS.map((preset) => (
              <button
                key={preset.value}
                className={`style-button ${settings.theme === preset.value ? 'active' : ''}`}
                onClick={() => settings.set('theme', preset.value)}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Font Family */}
        <div className="style-section">
          <label className="style-label">字体</label>
          <div className="style-button-group">
            {FONT_FAMILIES.map((font) => (
              <button
                key={font.value}
                className={`style-button ${settings.fontFamily === font.value ? 'active' : ''}`}
                onClick={() => settings.set('fontFamily', font.value)}
              >
                {font.label}
              </button>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div className="style-section">
          <label className="style-label">字号</label>
          <div className="style-button-group">
            {FONT_SIZES.map((size) => (
              <button
                key={size.value}
                className={`style-button ${settings.fontSize === size.value ? 'active' : ''}`}
                onClick={() => settings.set('fontSize', size.value)}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>

        {/* Theme Color */}
        <div className="style-section">
          <label className="style-label">主题色</label>
          <div className="style-color-grid">
            {THEME_COLORS.map((color) => (
              <button
                key={color.value}
                className={`style-color-button ${settings.themeColor === color.value ? 'active' : ''}`}
                style={{ backgroundColor: color.value }}
                onClick={() => settings.set('themeColor', color.value)}
                title={color.label}
                aria-label={color.label}
              />
            ))}
          </div>
        </div>

        {/* Code Theme */}
        <div className="style-section">
          <label className="style-label">代码主题</label>
          <select
            className="style-select"
            value={settings.codeTheme}
            onChange={(e) => settings.set('codeTheme', e.target.value as CodeTheme)}
          >
            {CODE_THEMES.map((theme) => (
              <option key={theme.value} value={theme.value}>
                {theme.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
