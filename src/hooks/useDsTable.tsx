/**
 * @file src/hooks/useDsTable.tsx
 * @author leon.wang(leon.wang@gooabcgle.net)
 */

import { useCallback, useMemo, useState } from 'react';
import { Form, message, notification } from 'antd';
import { useAntdTable, useLatest } from 'ahooks';
import type { Data, Params, Service } from 'ahooks/lib/useAntdTable/types';
import { AxiosPromise, AxiosError } from 'axios';

export const errorHandler = (
  error: AxiosError,
  toastDefaultError: boolean
): void => {
  if (
    error.response &&
    error.response.status === 401 &&
    error.response.headers?.['location']
  ) {
    window.location.replace(error.response?.headers?.['location']);
  } else if (error.response?.status >= 500 || !navigator.onLine) {
    notification.error({
      message: 'Server Error',
      description:
        'A server error occurred. Please try again later or contact support if the issue persists.',
    });
  } else {
    // Handle other errors
    if (toastDefaultError) {
      message.error('An error occurred. Please try again.');
    }
  }
};

const useTable = (
  request: (data: ObjectType) => AxiosPromise<ResponseDataType>,
  formValuesTransform?: (values: ObjectType) => ObjectType,
  responseDataTransform?: (
    data: ObjectType | ObjectType[]
  ) => ListResult<ObjectType>
) => {
  const [form] = Form.useForm();
  const req = useLatest(request);
  const [loading, setLoading] = useState(true);

  const service = useCallback(
    ({ current, pageSize, sorter }: Params[0], formData: ObjectType = {}) => {
      setLoading(true);
      const params: ObjectType = {
        pageNum: current - 1,
        pageSize,
      };

      let transformedData = formData;

      if (typeof formValuesTransform === 'function') {
        transformedData = formValuesTransform(formData);
      }

      Object.keys(transformedData).forEach((key) => {
        if (transformedData[key] !== '') {
          params[key] = transformedData[key];
        }
      });

      if (sorter?.order) {
        params.sorts = [
          {
            direction: sorter?.order === 'descend' ? 'DESC' : 'ASC',
            property: sorter?.columnKey,
          },
        ];
      }

      return req
        .current(params)
        .then(({ data: { data: resData, result } }) => {
          if (result === 'success') {
            if (typeof responseDataTransform === 'function') {
              return responseDataTransform(resData);
            }

            const result = resData as ListObjectType;

            return {
              total: result.totals,
              list: result.records,
            };
          } else {
            message.error('Failed to fetch data from server.');
            return {
              total: 0,
              list: [],
            };
          }
        })
        .catch((error: AxiosError) => {
          errorHandler(error, true);
          return {
            total: 0,
            list: [],
          };
        });
    },
    [formValuesTransform, req, responseDataTransform]
  );

  const {
    tableProps,
    search: { submit, reset },
  } = useAntdTable<Data, Params>(service as Service<Data, Params>, {
    debounceWait: 400,
    form,
    onFinally() {
      setLoading(false);
    },
  });

  const pagination = useMemo(() => {
    return {
      ...tableProps.pagination,
      showTotal: (total, range) => `${range} of ${total} items`,
      showQuickJumper: false,
      showSizeChanger: {
        variant: 'underlined',
        size: 'small',
      },
      pageSizeOptions: [10, 20, 30, 40, 50],
    };
  }, [tableProps]);

  return {
    tableProps: {
      ...tableProps,
      loading,
      pagination,
      scroll: { x: 'max-content' },
    },
    form,
    submit,
    reset,
  };
};

export default useTable;
