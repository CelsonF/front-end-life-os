import type { User } from '@/types';

interface UserInfoProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

const sizeMap = {
  sm: { avatar: 32, text: 'text-sm', gap: 'gap-2' },
  md: { avatar: 44, text: 'text-base', gap: 'gap-3' },
  lg: { avatar: 64, text: 'text-lg', gap: 'gap-4' },
};

export function UserInfo({ user, size = 'md', showDetails = true }: UserInfoProps) {
  const s = sizeMap[size];
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={`flex items-center ${s.gap}`}>
      {/* Avatar */}
      {user.photo ? (
        <img
          src={user.photo}
          alt={user.name}
          className="rounded-full object-cover"
          style={{ width: s.avatar, height: s.avatar }}
        />
      ) : (
        <div
          className="rounded-full bg-primary flex items-center justify-center text-on-primary font-semibold"
          style={{ width: s.avatar, height: s.avatar, fontSize: s.avatar * 0.4 }}
        >
          {initials}
        </div>
      )}

      {/* Details */}
      {showDetails && (
        <div>
          <p className={`${s.text} font-semibold text-foreground`}>
            {user.name}
          </p>
          <p className="text-xs text-text-secondary">
            Age {user.age} &middot; Level {user.level}
          </p>
        </div>
      )}
    </div>
  );
}
