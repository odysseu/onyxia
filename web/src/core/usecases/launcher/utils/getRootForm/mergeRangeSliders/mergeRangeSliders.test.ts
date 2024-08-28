import { symToStr } from "tsafe/symToStr";
import { it, expect, describe } from "vitest";
import { mergeRangeSliders, type FormFieldGroupLike } from "./mergeRangeSliders";
import { createTemporaryRangeSlider } from "./temporaryRangeSlider";
import type { FormField } from "core/usecases/launcher/formTypes";
import { id } from "tsafe/id";

describe(symToStr({ mergeRangeSliders }), () => {
    it("base case", () => {
        const formFieldGroup: FormFieldGroupLike = {
            "type": "group",
            "helmValuesPathSegment": "root",
            "children": [
                {
                    "type": "group",
                    "helmValuesPathSegment": "resources",
                    "children": [
                        {
                            "type": "group",
                            "helmValuesPathSegment": "requests",
                            "children": [
                                createTemporaryRangeSlider({
                                    "payload": {
                                        "isReadonly": false,
                                        "sliderMin": 50,
                                        "sliderMax": 40000,
                                        "sliderStep": 50,
                                        "sliderUnit": "m",
                                        "sliderExtremitySemantic": "guaranteed",
                                        "sliderRangeId": "cpu",
                                        "helmValue": "150m",
                                        "helmValuesPath": [
                                            "resources",
                                            "requests",
                                            "cpu"
                                        ],
                                        "description": "The amount of cpu guaranteed",
                                        "sliderExtremity": "down",
                                        "title": "CPU"
                                    }
                                })
                            ]
                        },
                        {
                            "type": "group",
                            "helmValuesPathSegment": "limits",
                            "children": [
                                createTemporaryRangeSlider({
                                    "payload": {
                                        "isReadonly": true,
                                        "sliderMin": 50,
                                        "sliderMax": 40000,
                                        "sliderStep": 50,
                                        "sliderUnit": "m",
                                        "sliderExtremitySemantic": "Maximum",
                                        "sliderRangeId": "cpu",
                                        "helmValue": "30000m",
                                        "helmValuesPath": ["resources", "limits", "cpu"],
                                        "description": "The maximum amount of cpu",
                                        "sliderExtremity": "up"
                                    }
                                })
                            ]
                        }
                    ]
                }
            ]
        };

        mergeRangeSliders({ formFieldGroup });

        expect(formFieldGroup).toStrictEqual({
            "type": "group",
            "helmValuesPathSegment": "root",
            "children": [
                {
                    "type": "group",
                    "helmValuesPathSegment": "resources",
                    "children": [
                        id<FormField.RangeSlider>({
                            "type": "field",
                            "title": "CPU",
                            "fieldType": "range slider",
                            "unit": "m",
                            "step": 50,
                            "lowEndRange": {
                                "isReadonly": false,
                                "helmValuesPath": ["resources", "requests", "cpu"],
                                "value": 150,
                                "rangeEndSemantic": "guaranteed",
                                "min": 50,
                                "max": 40000,
                                "description": "The amount of cpu guaranteed"
                            },
                            "highEndRange": {
                                "isReadonly": true,
                                "helmValuesPath": ["resources", "limits", "cpu"],
                                "value": 30000,
                                "rangeEndSemantic": "Maximum",
                                "min": 50,
                                "max": 40000,
                                "description": "The maximum amount of cpu"
                            }
                        })
                    ]
                }
            ]
        });
    });

    it("with two range slider", () => {
        const formFieldGroup: FormFieldGroupLike = {
            "type": "group",
            "helmValuesPathSegment": "root",
            "children": [
                {
                    "type": "group",
                    "helmValuesPathSegment": "resources",
                    "children": [
                        {
                            "type": "group",
                            "helmValuesPathSegment": "requests",
                            "children": [
                                createTemporaryRangeSlider({
                                    "payload": {
                                        "isReadonly": false,
                                        "sliderMin": 50,
                                        "sliderMax": 40000,
                                        "sliderStep": 50,
                                        "sliderUnit": "m",
                                        "sliderExtremitySemantic": "guaranteed",
                                        "sliderRangeId": "cpu",
                                        "helmValue": "150m",
                                        "helmValuesPath": [
                                            "resources",
                                            "requests",
                                            "cpu"
                                        ],
                                        "description": "The amount of cpu guaranteed",
                                        "sliderExtremity": "down",
                                        "title": "CPU"
                                    }
                                }),
                                createTemporaryRangeSlider({
                                    "payload": {
                                        "isReadonly": false,
                                        "sliderMin": 1,
                                        "sliderMax": 200,
                                        "sliderStep": 1,
                                        "sliderUnit": "Gi",
                                        "sliderExtremitySemantic": "guaranteed",
                                        "sliderRangeId": "memory",
                                        "helmValue": "2Gi",
                                        "helmValuesPath": [
                                            "resources",
                                            "requests",
                                            "memory"
                                        ],
                                        "description": "The amount of memory guaranteed",
                                        "sliderExtremity": "down",
                                        "title": "memory"
                                    }
                                })
                            ]
                        },
                        {
                            "type": "group",
                            "helmValuesPathSegment": "limits",
                            "children": [
                                createTemporaryRangeSlider({
                                    "payload": {
                                        "isReadonly": false,
                                        "sliderMin": 50,
                                        "sliderMax": 40000,
                                        "sliderStep": 50,
                                        "sliderUnit": "m",
                                        "sliderExtremitySemantic": "Maximum",
                                        "sliderRangeId": "cpu",
                                        "helmValue": "30000m",
                                        "helmValuesPath": ["resources", "limits", "cpu"],
                                        "description": "The maximum amount of cpu",
                                        "sliderExtremity": "up"
                                    }
                                }),
                                createTemporaryRangeSlider({
                                    "payload": {
                                        "isReadonly": false,
                                        "sliderMin": 1,
                                        "sliderMax": 200,
                                        "sliderStep": 1,
                                        "sliderUnit": "Gi",
                                        "sliderExtremitySemantic": "Maximum",
                                        "sliderRangeId": "memory",
                                        "helmValue": "50Gi",
                                        "helmValuesPath": [
                                            "resources",
                                            "limits",
                                            "memory"
                                        ],
                                        "description": "The maximum amount of memory",
                                        "sliderExtremity": "up"
                                    }
                                })
                            ]
                        }
                    ]
                }
            ]
        };

        mergeRangeSliders({ formFieldGroup });

        expect(formFieldGroup).toStrictEqual({
            "type": "group",
            "helmValuesPathSegment": "root",
            "children": [
                {
                    "type": "group",
                    "helmValuesPathSegment": "resources",
                    "children": [
                        id<FormField.RangeSlider>({
                            "type": "field",
                            "title": "CPU",
                            "fieldType": "range slider",
                            "unit": "m",
                            "step": 50,
                            "lowEndRange": {
                                "isReadonly": false,
                                "helmValuesPath": ["resources", "requests", "cpu"],
                                "value": 150,
                                "rangeEndSemantic": "guaranteed",
                                "min": 50,
                                "max": 40000,
                                "description": "The amount of cpu guaranteed"
                            },
                            "highEndRange": {
                                "isReadonly": false,
                                "helmValuesPath": ["resources", "limits", "cpu"],
                                "value": 30000,
                                "rangeEndSemantic": "Maximum",
                                "min": 50,
                                "max": 40000,
                                "description": "The maximum amount of cpu"
                            }
                        }),
                        id<FormField.RangeSlider>({
                            "type": "field",
                            "title": "memory",
                            "fieldType": "range slider",
                            "unit": "Gi",
                            "step": 1,
                            "lowEndRange": {
                                "isReadonly": false,
                                "helmValuesPath": ["resources", "requests", "memory"],
                                "value": 2,
                                "rangeEndSemantic": "guaranteed",
                                "min": 1,
                                "max": 200,
                                "description": "The amount of memory guaranteed"
                            },
                            "highEndRange": {
                                "isReadonly": false,
                                "helmValuesPath": ["resources", "limits", "memory"],
                                "value": 50,
                                "rangeEndSemantic": "Maximum",
                                "min": 1,
                                "max": 200,
                                "description": "The maximum amount of memory"
                            }
                        })
                    ]
                }
            ]
        });
    });
});
