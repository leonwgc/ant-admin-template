/**
 * @file services/mockRemoteSearch.ts
 * @author leon.wang
 */

export interface RemoteUserOption {
  label: string;
  value: string;
  email: string;
}

const MOCK_USERS: RemoteUserOption[] = [
  { label: 'Alice Johnson', value: 'alice-johnson', email: 'alice@example.com' },
  { label: 'Bob Smith', value: 'bob-smith', email: 'bob@example.com' },
  { label: 'Carol Williams', value: 'carol-williams', email: 'carol@example.com' },
  { label: 'David Brown', value: 'david-brown', email: 'david@example.com' },
  { label: 'Emma Davis', value: 'emma-davis', email: 'emma@example.com' },
  { label: 'Frank Miller', value: 'frank-miller', email: 'frank@example.com' },
  { label: 'Grace Wilson', value: 'grace-wilson', email: 'grace@example.com' },
  { label: 'Henry Moore', value: 'henry-moore', email: 'henry@example.com' },
  { label: 'Isabella Taylor', value: 'isabella-taylor', email: 'isabella@example.com' },
  { label: 'Jack Anderson', value: 'jack-anderson', email: 'jack@example.com' },
];

export const mockSearchUsersApi = async (
  keyword: string,
): Promise<RemoteUserOption[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const normalizedKeyword = keyword.trim().toLowerCase();
  if (!normalizedKeyword) return MOCK_USERS;

  return MOCK_USERS.filter((user) =>
    `${user.label} ${user.email}`.toLowerCase().includes(normalizedKeyword),
  );
};
