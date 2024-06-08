const calculateTimeDifference = (previousTime: string): string => {
  const previous: Date = new Date(previousTime);
  const currentTime: Date = new Date();
  const diffMs: number = currentTime.getTime() - previous.getTime();
  const diffMinutes: number = Math.floor(diffMs / 60000);
  const diffHours: number = Math.floor(diffMs / 3600000);
  const diffDays: number = Math.floor(diffMs / 86400000);
  if (diffDays < 1) {
    if (diffMinutes < 1) {
      return 'now';
    } else if (diffHours < 1) {
      return `${diffMinutes}m ago`;
    } else {
      return `${diffHours}h ago`;
    }
  } else {
    return previousTime;
  }
};

export {calculateTimeDifference};
