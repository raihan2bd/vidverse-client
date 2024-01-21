export default function convertViews(views: number): string {
  if (views >= 1e9) {
    return (views / 1e9).toFixed(1) + 'b';
  } else if (views >= 1e6) {
    return (views / 1e6).toFixed(1) + 'm';
  } else if (views >= 1e3) {
    return (views / 1e3).toFixed(1) + 'k';
  } else {
    return views.toString();
  }
}