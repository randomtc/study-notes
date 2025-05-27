import React, { useEffect, useRef, useState } from 'react';

import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import TextEllipsis from '../TextEllipsis';
interface IProps {
    value: string;
    onEdit: (val: string) => void;
    maxLines?: number;
}
const EditValue = (props: IProps) => {
    const { value: propsValue, onEdit, maxLines } = props;
    const [value, setValue] = useState(propsValue);
    const [inputValue, setInputValue] = useState(value);
    const [edit, seteEit] = useState<boolean>(false);
    const measuringRef = useRef<HTMLSpanElement>(null);
    const [inputWidth, setInputWidth] = useState<number>(0);

    /**设置Input框宽度，及其文本宽度 */
    const updateWidth = () => {
        const width = (measuringRef.current as HTMLSpanElement).offsetWidth;
        setInputWidth(width);
    };
    useEffect(() => {
        if (measuringRef.current) {
            updateWidth();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [measuringRef.current]);
    return (
        <div style={{ display: 'inline-block' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div>
                    {!edit ? (
                        <span
                            style={{
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 4,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '24vw',
                                lineHeight: '1.5',
                                maxHeight: '6em',
                            }}
                            ref={measuringRef}
                        >
                            {value ? <TextEllipsis text={value} maxLines={maxLines} /> : '--'}
                        </span>
                    ) : (
                        <Input.TextArea
                            rows={inputWidth > 200 ? 3 : 1}
                            style={{
                                width: inputWidth > 200 ? inputWidth : inputWidth + 80,
                                resize: 'both',
                            }}
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                            }}
                        />
                    )}
                </div>
                <div style={{ marginLeft: 12, color: '#5478FC' }}>
                    {edit && (
                        <div style={{ display: 'flex' }}>
                            <div>
                                <CheckOutlined
                                    onClick={() => {
                                        setValue(inputValue);
                                        onEdit(inputValue);
                                        seteEit(false);
                                    }}
                                />
                            </div>
                            <div style={{ marginLeft: 5 }}>
                                <CloseOutlined
                                    onClick={() => {
                                        seteEit(false);
                                    }}
                                />
                            </div>
                        </div>
                    )}
                    {!edit && (
                        <>
                            <EditOutlined
                                onClick={() => {
                                    updateWidth();
                                    seteEit(true);
                                }}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditValue;