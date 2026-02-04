import React, { useState, useMemo } from 'react';
import Card from '../../components/common/UI/Card';
import Input from '../../components/common/UI/Input';
import Label from '../../components/common/UI/Label';
import Button from '../../components/common/UI/Button';
import { Trash2, Plus } from 'lucide-react';

interface Criterion {
    id: string;
    description: string;
    maxMarks: number;
}

const makeId = () => Math.random().toString(36).slice(2, 9);

const RubricBuilder: React.FC = () => {
    const [rubricName, setRubricName] = useState('');
    const [criteria, setCriteria] = useState<Criterion[]>([
        { id: makeId(), description: '', maxMarks: 10 },
    ]);

    const addCriterion = () => {
        setCriteria(prev => [...prev, { id: makeId(), description: '', maxMarks: 10 }]);
    };

    const removeCriterion = (id: string) => {
        setCriteria(prev => prev.filter(c => c.id !== id));
    };

    const updateCriterion = (id: string, field: keyof Criterion, value: string | number) => {
        setCriteria(prev =>
            prev.map(c =>
                c.id === id ? { ...c, [field]: value } : c
            )
        );
    };

    const totalScore = useMemo(() => {
        return criteria.reduce((sum, c) => sum + (c.maxMarks || 0), 0);
    }, [criteria]);

    const handleSave = () => {
        const rubric = {
            name: rubricName,
            criteria: criteria,
            totalScore: totalScore,
        };
        console.log('Saving Rubric:', rubric);
        alert('Rubric saved! Check console for details.');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Rubric Builder</h1>
                <p className="text-[rgb(var(--color-muted))] mt-1">Create grading criteria for project evaluation</p>
            </div>

            {/* Rubric Form */}
            <Card>
                <div className="space-y-6">
                    {/* Rubric Name */}
                    <div>
                        <Label htmlFor="rubric-name">Rubric Name</Label>
                        <Input
                            id="rubric-name"
                            value={rubricName}
                            onChange={(e) => setRubricName(e.target.value)}
                            placeholder="e.g., Final Project Evaluation"
                        />
                    </div>

                    {/* Criteria List */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <Label>Grading Criteria</Label>
                            <Button variant="outline" onClick={addCriterion}>
                                <Plus size={16} className="mr-1" /> Add Criterion
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {criteria.map((criterion, index) => (
                                <div
                                    key={criterion.id}
                                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                                >
                                    <span className="text-sm text-[rgb(var(--color-muted))] w-6">{index + 1}.</span>

                                    <div className="flex-1">
                                        <Input
                                            value={criterion.description}
                                            onChange={(e) => updateCriterion(criterion.id, 'description', e.target.value)}
                                            placeholder="Criterion description (e.g., Code Quality)"
                                        />
                                    </div>

                                    <div className="w-24">
                                        <Input
                                            type="number"
                                            min={0}
                                            value={criterion.maxMarks}
                                            onChange={(e) => updateCriterion(criterion.id, 'maxMarks', parseInt(e.target.value) || 0)}
                                            placeholder="Marks"
                                        />
                                    </div>

                                    <button
                                        onClick={() => removeCriterion(criterion.id)}
                                        disabled={criteria.length === 1}
                                        className={`p-2 rounded-md transition-colors ${criteria.length === 1
                                                ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                                                : 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                                            }`}
                                        aria-label="Remove criterion"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Total Score */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div>
                            <span className="text-lg font-semibold">Total Score:</span>
                            <span className="text-2xl font-bold ml-2 text-[rgb(var(--color-primary))]">{totalScore}</span>
                            <span className="text-[rgb(var(--color-muted))] ml-1">marks</span>
                        </div>
                        <Button variant="primary" onClick={handleSave} disabled={!rubricName || criteria.length === 0}>
                            Save Rubric
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default RubricBuilder;
