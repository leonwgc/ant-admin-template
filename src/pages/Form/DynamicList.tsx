/**
 * A dynamic list form component that allows users to add, remove, and edit items interactively.
 *
 * - Uses `ahooks`'s `useDynamicList` for list state management.
 * - Renders a list of input fields, each representing an item in the list.
 * - Provides controls to insert a new item, remove an item, and batch remove odd/even indexed items.
 * - Displays the current list state as a JSON string.
 *
 * @returns {JSX.Element} The rendered dynamic list form.
 */
import { MinusCircleOutlined } from '@derbysoft/neat-design-icons';
import { useDynamicList } from 'ahooks';
import { Button, Flex, Input, Space } from 'antd';

export default () => {
  const { list, remove, batchRemove, getKey, insert, replace } =
    useDynamicList<string>(['1']);

  const listIndexes = list.map((item, index) => index);

  const Row = (index: number, item: any) => (
    <div key={getKey(index)} style={{ marginBottom: 16 }}>
      <Input
        style={{ width: 300 }}
        placeholder="Please enter name"
        onChange={(e) => replace(index, e.target.value)}
        value={item}
      />

      {list.length > 1 && (
        <MinusCircleOutlined
          style={{ marginLeft: 8 }}
          onClick={() => {
            remove(index);
          }}
        />
      )}
    </div>
  );

  return (
    <>
      {list.map((ele, index) => Row(index, ele))}

      <Flex align="center" style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={() => {
            insert(list.length, '');
          }}
        >
          Add
        </Button>
      </Flex>

      <Space style={{ marginBottom: 16 }}>
        <Button
          danger
          disabled={list.length <= 1}
          onClick={() =>
            batchRemove(listIndexes.filter((index) => index % 2 === 0))
          }
        >
          Remove odd items
        </Button>
        <Button
          danger
          disabled={list.length <= 1}
          onClick={() =>
            batchRemove(listIndexes.filter((index) => index % 2 !== 0))
          }
        >
          Remove even items
        </Button>
      </Space>

      <div>{JSON.stringify(list)}</div>
    </>
  );
};
