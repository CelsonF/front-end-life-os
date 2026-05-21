import Image from 'next/image';
import type { User } from '@/types';

interface UserInfoProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

const SIZE_MAP = {
  sm: { avatar: 32, text: 'text-sm', gap: 'gap-2' },
  md: { avatar: 44, text: 'text-base', gap: 'gap-3' },
  lg: { avatar: 64, text: 'text-lg', gap: 'gap-4' },
};

const AVATAR_INITIALS_RATIO = 0.4;

export function UserInfo({
  user,
  size = 'md',
  showDetails = true,
}: UserInfoProps) {
  const sizeConfig = SIZE_MAP[size];
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={`flex items-center ${sizeConfig.gap}`}>
      {user.photo ? (
        <Image
          src={user.photo}
          alt={user.name}
          width={sizeConfig.avatar}
          height={sizeConfig.avatar}
          className="rounded-full object-cover"
        />
      ) : (
        <div
          className="rounded-full bg-primary flex items-center justify-center text-on-primary font-semibold"
          style={{
            width: sizeConfig.avatar,
            height: sizeConfig.avatar,
            fontSize: sizeConfig.avatar * AVATAR_INITIALS_RATIO,
          }}
        >
          {initials}
        </div>
      )}

      {showDetails && (
        <div>
          <p className={`${sizeConfig.text} font-semibold text-foreground`}>
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
