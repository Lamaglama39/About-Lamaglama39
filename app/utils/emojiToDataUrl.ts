/**
 * 絵文字をData URLに変換する関数
 * @param emoji - 使用する絵文字
 * @param size - 生成する画像のサイズ（ピクセル）
 * @returns Data URL形式の画像
 */
export function emojiToDataUrl(emoji: string, size: number = 32): string {
  // Canvasを作成
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Canvasをクリア
  ctx.clearRect(0, 0, size, size);
  
  // 絵文字を描画
  ctx.font = `${Math.floor(size * 0.9)}px serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(emoji, size / 2, size / 2);
  
  // Data URLとして返す
  return canvas.toDataURL('image/png');
}

/**
 * サーバーサイドの場合のダミーData URL（デフォルトの絵文字データを提供）
 */
export const fallbackEmojiDataUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsSAAALEgHS3X78AAADhUlEQVRYR8WXTUhUURTHf+/NjI6OH6UfkJYUFUFBVosIahG0algLKdq0KoKgRdHOTXsXQZAVodDKvkBatIigJKJaRGBgUURZkdrkx/g5b96cFvfOvBnfjN/MQH/4MO+8c8/5v3PPPfccpZTi/6Aabnh9FQ8vLgKD45aqD3cWV3F4cbIVzjVBNl8r2oBTqyDpglKgNbQ1Q+8ItBYJfU4DMvnKWASfMxBPwnw79EUgl4NSBp5kIJWD9NzKZCfQcBlJxuH0GhgdhFQCvgyB8UKpYrIZiCVh6AJEJ+BYC5xaD9GgbL4oBmzlN3wgF4NTa+FLL6TisOcZ9F2DVMYfqpwW0lnoboMPnXB0NRx7Dl+7Kg+FVWoAJ6R4z2X46MLRZnHpRASitg9KGWL7lLb3UJxthC+P4MIGuBAukJnXAFc5HNgDz57BwAg0P4D+05KwvLJSHJDMwtEV8KELLjXDpSZ5n9eAq7h3Fwxeh/A6eHgXHu6BeNJbvoynM6K8bw88DcOJFVK4nJI6sP8zrKiDlS1wPwI7m2Fko1SzcpXb3Q2vwtDWALfHYWdDgYRdB4LL4E0Clm+F931wsAHimyGZ92RZDazthqExyQtPojC4HQYiYFw2dEOqoO1QqMuQy8GaNhFq2QhvH0LOKb9nRD+8TMKWF3C+UZTveANvt0HzKlEclMytCc/lCzRdknU+B2t74M2YhOj6B/H3eBwCDuxdBs+WwLEV0LoUTm+EV1tgbXOhcihiANxQzORg/SMYeSyKbn4W5dEYtDdCuBuGP8GOOtlz8yt0bPOXybyZMMflRUNnHJb3wshXOLMa8ZfyfCnHTwRgok8u9d6PovsqbIrCwFYI1Xr75vQBSwacxNS/B8YnYX8Iwr0wPjUdHk/C5AVYdAe2v4YDdTB0HkLLpnXkNcDJ3qbXRiV8z4pRx2Fa0aX4EoN0AALdMHEW6hbP7DfXQK7TYM0VGSxcvynHSUbOF28iMHkJqgOFhsr2AXeo9B2Fgc/So81lQrHwbMARrF0I7W3QMwSBGk+uahOuEe2jsGUCdiyV5FSVATdBbQ3C4H1oXCQlOVQFQVVY0OzS63OfHr0F19rLGCrZiFwDgRo4uQv6N0k/CCj/cLGVGwO5rFx84wfEQNUG8oTK6wf/8Hv+G/QD+z7G7hzo5mAAAAAASUVORK5CYII="; 