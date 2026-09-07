/**
 * Mock API - Simulate backend data fetching with enhanced user data
 */
export const mockUserData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'active',
    department: 'Engineering',
    joinDate: '2023-01-15',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    performance: 95,
    projects: 12,
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'User',
    status: 'active',
    department: 'Marketing',
    joinDate: '2023-03-20',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    performance: 88,
    projects: 8,
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'User',
    status: 'inactive',
    department: 'Sales',
    joinDate: '2022-11-10',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    performance: 62,
    projects: 4,
  },
  {
    id: 4,
    name: 'Alice Williams',
    email: 'alice.williams@example.com',
    role: 'Manager',
    status: 'active',
    department: 'Engineering',
    joinDate: '2022-08-05',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    performance: 92,
    projects: 15,
  },
  {
    id: 5,
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    role: 'User',
    status: 'active',
    department: 'HR',
    joinDate: '2023-05-12',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
    performance: 78,
    projects: 6,
  },
  {
    id: 6,
    name: 'Diana Prince',
    email: 'diana.prince@example.com',
    role: 'Admin',
    status: 'active',
    department: 'Engineering',
    joinDate: '2021-12-01',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana',
    performance: 98,
    projects: 20,
  },
  {
    id: 7,
    name: 'Edward Norton',
    email: 'edward.norton@example.com',
    role: 'User',
    status: 'inactive',
    department: 'Sales',
    joinDate: '2023-02-28',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Edward',
    performance: 55,
    projects: 3,
  },
  {
    id: 8,
    name: 'Fiona Green',
    email: 'fiona.green@example.com',
    role: 'Manager',
    status: 'active',
    department: 'Marketing',
    joinDate: '2022-07-15',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fiona',
    performance: 85,
    projects: 11,
  },
  {
    id: 9,
    name: 'George Harris',
    email: 'george.harris@example.com',
    role: 'User',
    status: 'active',
    department: 'Engineering',
    joinDate: '2023-04-10',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=George',
    performance: 82,
    projects: 9,
  },
  {
    id: 10,
    name: 'Helen Taylor',
    email: 'helen.taylor@example.com',
    role: 'User',
    status: 'active',
    department: 'HR',
    joinDate: '2023-06-22',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Helen',
    performance: 76,
    projects: 5,
  },
  {
    id: 11,
    name: 'Ivan Martinez',
    email: 'ivan.martinez@example.com',
    role: 'Admin',
    status: 'active',
    department: 'Engineering',
    joinDate: '2022-09-18',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ivan',
    performance: 94,
    projects: 18,
  },
  {
    id: 12,
    name: 'Julia Anderson',
    email: 'julia.anderson@example.com',
    role: 'User',
    status: 'inactive',
    department: 'Sales',
    joinDate: '2023-01-30',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Julia',
    performance: 58,
    projects: 2,
  },
  {
    id: 13,
    name: 'Kevin White',
    email: 'kevin.white@example.com',
    role: 'Manager',
    status: 'active',
    department: 'Marketing',
    joinDate: '2022-10-05',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin',
    performance: 89,
    projects: 13,
  },
  {
    id: 14,
    name: 'Laura Davis',
    email: 'laura.davis@example.com',
    role: 'User',
    status: 'active',
    department: 'HR',
    joinDate: '2023-03-15',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laura',
    performance: 80,
    projects: 7,
  },
  {
    id: 15,
    name: 'Michael Lee',
    email: 'michael.lee@example.com',
    role: 'User',
    status: 'active',
    department: 'Engineering',
    joinDate: '2022-12-20',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    performance: 84,
    projects: 10,
  },
];

/**
 * Mock API request function
 */
export const fetchUserList = (
  params: ObjectType,
): Promise<{ data: ResponseDataType }> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      const { pageNum = 0, pageSize = 10, name, role, status, sorts } = params;

      // Filter data
      let filteredData = [...mockUserData];

      if (name) {
        filteredData = filteredData.filter((user) =>
          user.name.toLowerCase().includes((name as string).toLowerCase()),
        );
      }

      if (role) {
        filteredData = filteredData.filter((user) => user.role === role);
      }

      if (status) {
        filteredData = filteredData.filter((user) => user.status === status);
      }

      // Sort data
      if (sorts && Array.isArray(sorts) && sorts.length > 0) {
        const { property, direction } = sorts[0];
        filteredData.sort((a, b) => {
          const aValue = a[property];
          const bValue = b[property];
          if (direction === 'ASC') {
            return aValue > bValue ? 1 : -1;
          } else {
            return aValue < bValue ? 1 : -1;
          }
        });
      }

      // Pagination
      const start = (pageNum as number) * (pageSize as number);
      const end = start + (pageSize as number);
      const paginatedData = filteredData.slice(start, end);

      // Return mock response
      resolve({
        data: {
          result: 'success',
          timestamp: Date.now(),
          data: {
            totals: filteredData.length,
            totalPages: Math.ceil(filteredData.length / (pageSize as number)),
            pageSize: pageSize as number,
            pageNum: pageNum as number,
            records: paginatedData,
          },
        },
      });
    }, 600); // 600ms delay to simulate network
  });
};
